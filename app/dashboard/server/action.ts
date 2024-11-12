'use server';
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ProfileType } from "../profile/page";
import { getUpdatedData } from "./getUpdatedData";
import { uploadImage } from "./uploadImage";

export async function updateProfile(prevProfileData: ProfileType | null, formData: FormData) {
    if (!prevProfileData)
        return;

    const currentProfileData = {
        myImages: [] as string[],
        about: '',
        socialLinks: [] as { label: string; link: string }[],
        skills: [] as { name: string; level: string }[],
    };

    try {
        for (const [key, value] of Array.from(formData.entries())) {
            if (key === 'aboutImage' && value instanceof File) {
                if (value.name !== 'undefined') {                   //Only enter if any image uploaded
                    const myImageConfig = {
                        folderName: "myImages",
                        width: 405,
                        height: 405,
                    }

                    const { secure_url } = await uploadImage(value, myImageConfig) as { secure_url: string };
                    currentProfileData.myImages = [prevProfileData.myImages[0] ? prevProfileData.myImages[0] : secure_url, secure_url];

                } else
                    currentProfileData.myImages = [...prevProfileData.myImages];

            } else if (key === 'editor') {
                currentProfileData.about = DOMPurify.sanitize(value.toString());

            } else if (prevProfileData.socialLinks.some(sl => sl.label.toLocaleLowerCase() === key.toLocaleLowerCase())) {
                currentProfileData.socialLinks.push({ label: key, link: value as string });

            } else if (!key.startsWith('$ACTION')) {
                currentProfileData.skills.push({ name: key, level: value as string });
            }
        }

        //Return Only Changed Data that will need to be updated
        const updatedData = getUpdatedData(prevProfileData, currentProfileData);

        // console.log('Previous Data:', prevProfileData.myImages);

        // console.log('Current Data:', currentProfileData);

        // console.log('UpdatedData', updatedData);

        if (!Object.keys(updatedData).length)
            return console.log('There are no updates');
        else {
            const jwtToken = cookies().get('jwt');

            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/dashboard/profile/update`, {
                ...updatedData,
            }, {
                headers: {
                    authorization: jwtToken?.value as string,
                },
            });

            revalidatePath('/dashboard/profile');
            console.log('Response:', response.data.successMessage);
        }

    } catch (error) {
        console.log('Error processing form data:', error);
    }
}

export async function addSocialLink(formData: FormData) {
    console.log("profileData");
    // for (const [key, value] of Array.from(formData.entries())) {
    //     console.log(key, value);
    // }
}