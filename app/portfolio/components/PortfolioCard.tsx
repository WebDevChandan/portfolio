"use client";
import { useRouter } from "next/navigation";
import { PortfolioThumbImage } from ".";

type portfolioCardDataType = {
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
                        onClick={() => router.push(`${location.pathname}/details/${details_id}`)}
                    >
                        <div className="portfolio-item-inner outer-shadow">
                            <PortfolioThumbImage title={title} src={src} altText={altText} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
