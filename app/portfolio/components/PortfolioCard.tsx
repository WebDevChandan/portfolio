"use client";
import { useRouter } from "next/navigation";
import { PortfolioThumbImage } from ".";
import { ThumbImage } from "@/app/certificate/components";

export type portfolioCardDataType = {
    title: string;
    src: string;
    altText: string;
    details_id: string;
    portfolioCategory: {
        label: string;
    };
}[] | null

export default function PortfolioCard({ portfolioCardData }: { portfolioCardData: portfolioCardDataType }) {
    const router = useRouter();

    return (
        <div className="row portfolio-items">
            {
                portfolioCardData?.map(({ details_id, title, src, altText, portfolioCategory }, index) => (
                    <div className="portfolio-item" data-category={portfolioCategory.label.toLowerCase().replace(/[" "]/g, "-")} key={index}
                        onClick={() => router.push(`portfolio/details/${details_id}`)}
                    >
                        <div className="portfolio-item-inner outer-shadow">
                            <div className="portfolio-item-img">
                                <ThumbImage
                                    width={320}
                                    height={290}
                                    src={src}
                                    altText={altText}
                                    title={title}
                                />
                                <span className="view-project">view project</span>
                            </div>
                            <p className="portfolio-item-title">{title}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
