import prisma from "@/utils/prisma";
import { isValidToken } from "../../server/isValidToken";

export type EducationDetailType = {
    from: string,
    to: string,
    info: string,
    degree: string,
    institution: {
        title: string;
        location: string;
    },
}[]

export const fetchEducationDetails = async (): Promise<EducationDetailType> => {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        console.error("Invalid Token!");

    try {
        const educationData = await prisma.education.findMany({
            select: {
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
            }
        });

        return educationData;

    } catch (error) {
        throw new Error(`Error Fetching Home Details: ${error}`);
    }

}