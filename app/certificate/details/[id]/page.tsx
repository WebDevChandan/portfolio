import prisma from '@/utils/prisma';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SpinLoader from '../../../components/Loader/SpinLoader';
import { HeaderDetails, MainDetails } from './components';
import './styles/certificateDetails.scss';

export type DetailPropsType = {
    params: Promise<{
        id: string;
    }>;
}

const fetchCertificateDetails = async (slug: string) => {
    try {
        const certificateDetails = await prisma.certificateDetail.findUnique({
            where: { slug },
            select: {
                certificateHeaderDetail: {
                    select: {
                        authority: true,
                        issueDate: true,
                        expiryDate: true,
                        skill: true,
                        link: true,
                        description: true,
                    }
                },
                certificateMainDetail: {
                    select: {
                        largeImage: true,
                        imgText: true,
                    }
                },
                slug: true
            }
        });

        return certificateDetails;

    } catch (error) {
        throw new Error(`Error Fetching Certificate Card Info: ${error}`);
    }
}

export default async function CertificateDetails(props: DetailPropsType) {
    const params = await props.params;

    const { id } = params;

    const certificateDetails = await fetchCertificateDetails(id);

    return (
        <Suspense fallback={<SpinLoader />}>
            {certificateDetails ? (<div className="cp certificate-popup">
                <div className="cp-details">
                    <div className="cp-details-inner">
                        <HeaderDetails headerDetails={certificateDetails?.certificateHeaderDetail} slug={certificateDetails?.slug} />
                    </div>
                </div>

                <div className="separator"></div>
                <div className="cp-main">
                    <MainDetails mainDetails={certificateDetails?.certificateMainDetail} />
                </div>
            </div>) : notFound()}
        </Suspense>
    )
}
