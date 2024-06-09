import { PrismaClient } from "@prisma/client";
import { PortfolioFilter } from ".";

const prisma = new PrismaClient();

const fetchPortfolioTabs = async () => {
    try {
        const portfolioCategories = await prisma.portfolioCategory.findMany({
            select: {
                label: true,
                active: true,
            }
        });

        return portfolioCategories;
    } catch (error) {
        console.log("Error Fetching Categories Data: ", error)
        return null;
    }
}

export default async function PortfolioTabs() {
    const portfolioTabs = await fetchPortfolioTabs();

    return (
        <div className="row">
            <div className="portfolio-filter">
                <PortfolioFilter portfolioTabs={portfolioTabs} />
            </div>
        </div>
    )
}
