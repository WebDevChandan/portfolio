import { PrismaClient } from "@prisma/client";
import "../../styles/portfolio.scss";
import { HeaderDetails, MainDetails } from './components';
import './styles/projectDetails.scss';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

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

        console.log("Reached Here");

        return portfolioDetails;
    } catch (error) {
        console.log(error);
    }
}

export default async function ProjectDetails({ params }: Params) {

    const uuid: string = params.id;
    console.log(uuid);
    const portfolioDetailsData = await fetchPortfolioDetails(uuid);
    console.log(portfolioDetailsData);

    return (
        <>
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
        </>
    )
}
