"use client";
import { useRouter } from "next/navigation";
import ThumbImage from "./ThumbImage";

export default function CertificateCard({ id, label, src, info }:
    { id: string, label: string, src: string, info: string }) {
    const router = useRouter();

    const openCertificateDetails = (id: string) => {
        router.push(`certificate/details/${id}`);
    }

    return (
        <div className="certificate-item" data-category="HackerRank" onClick={() => openCertificateDetails(id)}>
            <div className="certificate-item-inner outer-shadow">
                <div className="certificate-item-img">
                    <ThumbImage
                        width={320}
                        height={240}
                        src={`/img/certificate/thumb/${src}`}
                        altText={info}
                    />
                    <span className="view-certificate">view certificate</span>
                </div>
                <p className="certificate-item-title">{label}</p>
            </div>
        </div>
    )
}
