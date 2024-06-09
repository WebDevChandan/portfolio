import { PrismaClient } from '@prisma/client';
import { Title } from '../components';
import { PortfolioCard, PortfolioFilter, PortfolioTabs } from './components';
import './styles/portfolio.scss';

const prisma = new PrismaClient();

const fetchPortfolioCardData = async () => {
    try {
        const portfolioCardData = await prisma.portfolio.findMany({
            select: {
                title: true,
                src: true,
                altText: true,
                details_id: true,
                portfolioCategory: {
                    select: {
                        label: true,
                        active: true,
                    }
                }
            }
        })

        return portfolioCardData;
    } catch (error) {
        console.log("Error Fetching Portfolio Data: ", error)
        return null;
    }
}

export default async function Portfolio() {

    const portfolioCardData = await fetchPortfolioCardData();

    return (
        <section className="portfolio-section section" id="portfolio">
            <div className="container">

                <Title title="Portfolio" subTitle="Latest Projects" />

                <PortfolioTabs />

                <PortfolioCard portfolioCardData={portfolioCardData} />
            </div>
        </section>
    )
}
