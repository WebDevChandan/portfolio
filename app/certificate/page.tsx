import prisma from '@/utils/prisma';
import Title from '../components/Title';
import { CertificateCard } from './components/index';
import './styles/certificate.scss';
import { Suspense } from 'react';
import Loading from '../loading';

const fetchCertificateCardInfo = async () => {
    try {
        const certificateCardInfo = await prisma.certificate.findMany({
            select: {
                label: true,
                src: true,
                info: true,
                details_id: true
            }
        });
        return certificateCardInfo;

    } catch (error) {
        console.log("Error Fetching Certificate Card Info", error);
        return [];
    }
}

export default async function Certificate() {
    const certificateCardInfo = await fetchCertificateCardInfo();

    return (
        <section className="certificate-section section" id="certificate">
            <div className="container">
                <Title title='Certificate' subTitle='Achievements' />
                
                <Suspense fallback={<Loading />}>
                    <div className="row">
                        {certificateCardInfo && certificateCardInfo?.map(({ details_id, label, src, info }, index) => (
                            <CertificateCard id={details_id} label={label} src={src} info={info} key={index} />
                        ))}

                    </div>
                </Suspense>
            </div>
        </section>

    )
}
