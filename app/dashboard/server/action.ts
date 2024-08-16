'use server'
import axios from "axios";
import { ProfileType } from "../profile/page";
import { getUpdatedData } from "./getUpdatedData";
import { cookies, headers } from "next/headers";
import { getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";

// file: formData.get('aboutImage') instanceof File ? formData.get('aboutImage') as File : null
export async function updateProfile(prevProfileData: ProfileType | null, formData: FormData) {
    if (!prevProfileData)
        return;

    try {
        const currentProfileData = {
            myImages: [] as string[],
            about: '',
            socialLinks: [] as { label: string; link: string }[],
            skills: [] as { name: string; level: string }[],
        };

        formData.forEach((value, key) => {
            if (key === 'aboutImage' && value instanceof File) {
                if (value.name !== 'undefined')
                    currentProfileData.myImages = [prevProfileData.myImages[0], value.name];                    //First image is Home Page Image.
                else
                    currentProfileData.myImages = [prevProfileData.myImages[0], prevProfileData.myImages[1]];

            } else if (key === 'editor') {
                currentProfileData.about = value as string;

            } else if (['linkedin', 'github', 'leetcode', 'twitter'].includes(key)) {
                currentProfileData.socialLinks.push({ label: key, link: value as string });

            } else if (!key.startsWith('$ACTION')) {
                currentProfileData.skills.push({ name: key, level: value as string });
            }
        });

        const updatedData = getUpdatedData(prevProfileData, currentProfileData);

        if (!Object.keys(updatedData).length)
            return console.log('There are no updates');
        else {
            // console.log('Previous Data:', prevProfileData.about);

            // console.log('Current Data:', currentProfileData.about);

            // console.log('UpdatedData', updatedData);

            const jwtToken = cookies().get('jwt');

            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/dashboard/profile/update`, {
                ...updatedData,
            }, {
                headers: {
                    authorization: jwtToken?.value as string,
                },
            });

            console.log('Response:', response.data.successMessage);
            revalidatePath(`${process.env.NEXT_PUBLIC_URL}/about`);
        }

    } catch (error) {
        console.log('Error processing form data:', error);
    }
}