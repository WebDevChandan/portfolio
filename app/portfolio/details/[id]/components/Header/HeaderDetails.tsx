import prisma from "@/utils/prisma";
import { HeaderDescription, HeaderInfo, HeaderTitle } from "..";

type ProjectInfoType = {
    from: string;
    to: string;
    client: string;
    link: string;
    tools: string[];
    demo: string;
    description: string;
} | undefined


const fetchPortfolioDetail = async (details_id?: string) => {
    const portfolioDetail = await prisma.portfolio.findUnique({
        where: { details_id },
        select: {
            title: true,
            portfolioCategory: {
                select: {
                    label: true,
                }
            }
        }
    });
    return portfolioDetail;
}

export default async function HeaderDetail({ headerDetails, slug }: { headerDetails: ProjectInfoType, slug: string | undefined }) {

    const portfolioCardDetail = await fetchPortfolioDetail(slug);
    return (
        <div className="pp-details-inner">
            <HeaderTitle title={portfolioCardDetail!.title} category={portfolioCardDetail!.portfolioCategory.label} />

            <div className="pp-project-details">
                <div className="row">
                    <HeaderDescription description={headerDetails!.description} />
                    <HeaderInfo
                        from={headerDetails!.from}
                        to={headerDetails!.to}
                        client={headerDetails!.client}
                        link={headerDetails!.link}
                        tools={headerDetails!.tools}
                        demo={headerDetails?.demo}
                    />
                </div>
            </div>
        </div>
    )
}
