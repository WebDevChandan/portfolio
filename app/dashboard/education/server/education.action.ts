"use server";
import prisma from "@/utils/prisma";
import { isValidToken } from "../../server/isValidToken";
import { EducationDetailType } from "../../types/EducationType";
import { revalidatePath } from "next/cache";

export const fetchEducationDetails = async (): Promise<EducationDetailType> => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        console.error("Invalid Token!");

    try {
        const educationData = await prisma.education.findMany({
            select: {
                id: true,
                from: true,
                to: true,
                info: true,
                degree: true,
                institution: {
                    select: {
                        title: true,
                        location: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            }
        });

        return educationData;

    } catch (error) {
        throw new Error(`Error Fetching Education Details: ${error}`);
    }

}

export const addEducation = async (education: EducationDetailType[number]) => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid) {
        console.error("Invalid Token!");
        return { "errorMessage": "Invalid Token!" };
    }

    try {
        await prisma.education.create({
            data: {
                degree: education.degree,
                from: education.from,
                info: education.info,
                to: education.to,
                institution: {
                    title: education.institution.title,
                    location: education.institution.location,
                }
            }
        });

        revalidatePath('/dashboard/education');
        return { "message": "Education Added Successfully!" };

    } catch (error) {
        console.log('Error Adding Education Details', error);
        return { "errorMessage": "Error Adding Education!" };
    }

}

export const updateEducation = async (education: EducationDetailType[number]) => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid) {
        console.error("Invalid Token!");
        return { "errorMessage": "Invalid Token!" };
    }

    try {
        await prisma.education.update({
            where: {
                id: education.id
            },
            data: {
                degree: education.degree,
                from: education.from,
                info: education.info,
                to: education.to,
                institution: {
                    title: education.institution.title,
                    location: education.institution.location,
                }
            }
        });

        revalidatePath('/dashboard/education');
        return { "message": "Education Updated Successfully!" };

    } catch (error) {
        console.log('Error updating education details', error);
        return { "errorMessage": "Error Updating Education!" };
    }
}

export const deleteEducation = async (education: EducationDetailType[number]) => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid) {
        console.error("Invalid Token!");
        return { "errorMessage": "Invalid Token!" };
    }

    try {
        await prisma.education.delete({
            where: {
                id: education.id
            }
        });

        revalidatePath('/dashboard/education');
        return { "message": "Education Deleted Successfully!" };

    } catch (error) {
        console.log('Error Deleting Education Details', error);
        return { "errorMessage": "Error Deleting Education!" };
    }
}