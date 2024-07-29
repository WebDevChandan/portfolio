import prisma from '@/utils/prisma';
import { Suspense } from 'react';
import { Title, WaveLoader } from '../components';
import { PortfolioCard, PortfolioTabs } from './components';
import './styles/portfolio.scss';

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
        <section className="other-section portfolio-section" id="portfolio">
            <div className="container">

                <Title title="Portfolio" subTitle="Latest Projects" />

                <Suspense fallback={<WaveLoader />}>
                    <PortfolioTabs />

                    <PortfolioCard portfolioCardData={portfolioCardData} />
                </Suspense>
            </div>
        </section>
    )
}
