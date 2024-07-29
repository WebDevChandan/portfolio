import { DetailPropsType } from "@/app/certificate/details/[id]/page";
import { SpinLoader } from "@/app/components";
import prisma from "@/utils/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../../styles/portfolio.scss";
import { HeaderDetails, MainDetails } from './components';
import './styles/projectDetails.scss';

const fetchPortfolioDetails = async (slug: string) => {
    try {
        const portfolioDetails = await prisma.portfolioDetail.findUnique({
            where: {
                slug,
            }, select: {
                portfolioHeaderDetail: true,
                portfolioMainDetail: true,
                slug: true,
            }
        })

        return portfolioDetails;
    } catch (error) {
        console.log(error);
    }
}

export default async function ProjectDetails({ params: { id } }: DetailPropsType) {
    const portfolioDetailsData = await fetchPortfolioDetails(id);

    return (
        <Suspense fallback={<SpinLoader />}>
            {portfolioDetailsData ? (<div className="pp portfolio-popup">
                <div className="pp-details">
                    <HeaderDetails
                        headerDetails={portfolioDetailsData?.portfolioHeaderDetail}
                        slug={portfolioDetailsData?.slug}
                    />
                </div>

                <div className="separator"></div>

                <MainDetails
                    src={portfolioDetailsData!.portfolioMainDetail.imgSrc}
                    altText={portfolioDetailsData!.portfolioMainDetail.altText}
                    titleText={portfolioDetailsData?.portfolioMainDetail.titleText}
                    webFrameLink={portfolioDetailsData?.portfolioMainDetail.webFrameLink}
                />
            </div >) : notFound()}
        </Suspense>
    )
}
