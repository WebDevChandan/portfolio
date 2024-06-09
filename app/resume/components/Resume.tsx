import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const fetchResume = async () => {
    try {
        const resumeFile = await prisma.resume.findFirst({
            select: {
                file: true,
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
        <iframe src={`resume/${resumeFile?.file}`} frameBorder="0"></iframe>
    )
}
