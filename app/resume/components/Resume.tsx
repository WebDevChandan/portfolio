// "use client";
import { Suspense } from "react";
import PDFViewer from "./PDFViewer";
import Loading from "@/app/components/Loader/SpinLoader";

type resumeFileType = {
    resume: string;
}

export default async function Resume({ resumeFile }: { resumeFile: resumeFileType }) {
    const { status } = await fetch(`${process.env.NEXT_PUBLIC_URL}/resume/${resumeFile.resume}`);

    return (
        <>
            {
                status === 200 && <PDFViewer pdfUrl={`${process.env.NEXT_PUBLIC_URL}/resume/${resumeFile.resume}`} />
                ||
                <h2
                style={{
                    color:"var(--text-black-600)"
                }}
                >Opps! Resume Not Found 🥲</h2>
            }
        </>
    )
}
