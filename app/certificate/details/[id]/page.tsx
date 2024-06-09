import React from 'react'
import { HeaderDetails, MainDetails } from './components'
import './styles/certificateDetails.scss';
import { PrismaClient } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

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

export default async function CertificateDetails({ params }: Params) {
    const uuid: string = params.id;
    const certificateDetails = await fetchCertificateDetails(uuid);

    return (
        <>
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
        </>
    )
}
