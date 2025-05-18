"use server";
import prisma from "@/utils/prisma";
import { isValidToken } from "../../server/isValidToken";
import { ExperienceDetailType } from "../../types/ExperienceType";
import { revalidatePath } from "next/cache";

export const fetchExperienceDetails = async (): Promise<ExperienceDetailType> => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        console.error("Invalid Token!");

    try {
        const experienceData = await prisma.experience.findMany({
            select: {
                id: true,
                from: true,
                to: true,
                role: true,
                experienceDetail: true,
                organization: {
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

        return experienceData;

    } catch (error) {
        throw new Error(`Error Fetching Home Details: ${error}`);
    }

}

export const addExperience = async (experience: ExperienceDetailType[number]) => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid) {
        console.error("Invalid Token!");
        return { "errorMessage": "Invalid Token!" };
    }

    try {
        await prisma.experience.create({
            data: {
                role: experience.role,
                from: experience.from,
                experienceDetail: experience.experienceDetail,
                to: experience.to,
                organization: {
                    title: experience.organization.title,
                    location: experience.organization.location,
                }
            }
        });

        revalidatePath('/dashboard/experience');
        return { "message": "Experience Added Successfully!" };

    } catch (error) {
        console.log('Error Adding Experience Details', error);
        return { "errorMessage": "Error Adding Experience!" };
    }
}

export const updateExperience = async (experience: ExperienceDetailType[number]) => {

    const isTokenValid = await isValidToken();

    if (!isTokenValid) {
        console.error("Invalid Token!");
        return { "errorMessage": "Invalid Token!" };
    }

    try {
        await prisma.experience.update({
            where: {
                id: experience.id
            },
            data: {
                role: experience.role,
                from: experience.from,
                experienceDetail: experience.experienceDetail,
                to: experience.to,
                organization: {
                    title: experience.organization.title,
                    location: experience.organization.location,
                }
            }
        });

        revalidatePath('/dashboard/experience');
        return { "message": "Experience Updated Successfully!" };

    } catch (error) {
        console.log('Error updating Experience details', error);
        return { "errorMessage": "Error Updating Experience!" };
    }
}

export const deleteExperience = async (experience: ExperienceDetailType[number]) => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid) {
        console.error("Invalid Token!");
        return { "errorMessage": "Invalid Token!" };
    }

    try {
        await prisma.experience.delete({
            where: {
                id: experience.id
            }
        });

        revalidatePath('/dashboard/experience');
        return { "message": "Experience Deleted Successfully!" };

    } catch (error) {
        console.log('Error Deleting Experience Details', error);
        return { "errorMessage": "Error Deleting Experience!" };
    }
}