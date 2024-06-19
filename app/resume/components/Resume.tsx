import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const fetchResume = async () => {
    try {
        const resumeFile = await prisma.personalInfo.findFirst({
            select: {
                resume: false,
            }
        })
        return resumeFile;
    } catch (error) {
        console.log("Error Fetching Resume Data: ", error)
        return null;
    }

}

export default async function Resume() {
    const resumeFile = await fetchResume();

    return (
        resumeFile &&
        <iframe src={`resume/${resumeFile?.resume}`} frameBorder="0"></iframe>
    )
}
