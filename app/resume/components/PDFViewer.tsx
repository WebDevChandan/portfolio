"use client";
import { Button } from "@/app/components";
import styles from "./Resume.module.scss";

interface ResumeProps {
    resumeFile: string;
}

export default function PDFViewer({ resumeFile }: ResumeProps) {
    return (
        <div className={styles.resumeWrapper}>
            <iframe
                src={resumeFile}
                title="Chandan Kumar Resume"
                loading="lazy"
                className={styles.iframe}
            />

            <div className={styles.toolbar}>
                <Button href={resumeFile} target="_blank" label="🔗 Open in New Tab" />
            </div>
        </div>
    );
}
