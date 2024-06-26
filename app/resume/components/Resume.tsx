"use client";
import { useEffect, useState } from "react";
import PDFViewer from "./PDFViewer";

type resumeFileType = {
    resume: string;
}

export default function Resume({ resumeFile }: { resumeFile: resumeFileType }) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentURL = window.location.href;
            setUrl(currentURL);
        }
    })

    console.log(url);

    return <PDFViewer pdfUrl={`${url}/${resumeFile.resume}`} />
}
