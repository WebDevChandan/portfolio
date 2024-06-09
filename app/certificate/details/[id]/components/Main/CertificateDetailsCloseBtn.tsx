"use client";
import { useRouter } from "next/navigation"

export default function CertificateDetailsCloseBtn() {
    const router = useRouter();
    
    const closeCertificateDetails = () => {
        router.push("/certificate");
    }

    return (
        <div className="cp-close outer-shadow hover-in-shadow" onClick={()=>closeCertificateDetails()}>
            &times;
        </div>
    )
}
