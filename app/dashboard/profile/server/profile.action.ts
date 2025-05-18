'use server';
import prisma from "@/utils/prisma";
import DOMPurify from 'isomorphic-dompurify';
import { revalidatePath } from "next/cache";
import { isValidToken } from "../../server/isValidToken";
import { SkillsType } from "../components/ManageSkills";
import { SocialLinksType } from "../components/ManageSocialLinks";

export async function saveSkills(updatedSkills: SkillsType) {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        return { "errorMessage": "Invalid Token!" };

    try {
        await prisma.personalInfo.updateMany({
            data: {
                skills: updatedSkills
            }
        })

        revalidatePath('/dashboard/profile');
        return { "message": "Skills Saved Successfully!" };

    } catch (error) {
        console.log('Error While Saving Skills:', error);
        return { "errorMessage": "Error Saving Skills!" };
    }


}

export async function saveSocialLinks(updatedSocialLinks: SocialLinksType) {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        return { "errorMessage": "Invalid Token!" };

    try {
        await prisma.personalInfo.updateMany({
            data: {
                socialLinks: updatedSocialLinks
            }
        })

        revalidatePath('/dashboard/profile');

        return { "message": "Links Saved Successfully!" };

    } catch (error) {
        console.log('Error While Saving SocialLinks:', error);
        return { "errorMessage": "Error Saving Links!" };
    }
}

export async function saveAboutInfo(aboutInfo: string) {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        return { "errorMessage": "Invalid Token!" };

    const sanitizedAboutInfo: string | TrustedHTML = DOMPurify.sanitize(aboutInfo);

    try {
        await prisma.personalInfo.updateMany({
            data: {
                about: sanitizedAboutInfo
            }
        })

        revalidatePath('/dashboard/profile');
        return { "message": "Info Saved Successfully!" };

    } catch (error) {
        console.log('Error While Saving Info:', error);
        return { "errorMessage": "Error Saving Info!" };
    }

}

export async function saveAboutImage(uploadedFileURL: string) {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        return { "errorMessage": "Invalid Token!" };

    try {
        await prisma.personalInfo.updateMany({
            data: {
                aboutImage: uploadedFileURL
            }
        })

        revalidatePath('/dashboard/profile');
        return { "message": "Image Saved Successfully!" };

    } catch (error) {
        console.log('Error While Saving Info:', error);
        return { "errorMessage": "Error Saving Image!" };
    }
}

export async function saveResume(uploadedFileURL: string) {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        return { "errorMessage": "Invalid Token!" };

    try {
        await prisma.personalInfo.updateMany({
            data: {
                resume: uploadedFileURL
            }
        })

        revalidatePath('/dashboard/profile');
        return { "message": "File Saved Successfully!" };

    } catch (error) {
        console.log('Error While Saving Info:', error);
        return { "errorMessage": "Error Saving File!" };
    }
}