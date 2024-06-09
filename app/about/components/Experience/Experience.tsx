import { PrismaClient } from '@prisma/client';
import React from 'react'
import { FaBriefcase } from 'react-icons/fa'

const prisma = new PrismaClient();

const fetchExpericneDetail = async () => {
    try {
        const experienceDetail = await prisma.experience.findMany({
            select: {
                to: true,
                from: true,
                role: true,
                experienceDetail: true,
                organization: {
                    select: {
                        title: true,
                        location: true,
                    }
                }
            }
        });
        return experienceDetail;
    } catch (error) {
        console.log("Error Fetching Experience Data: ", error)
        return null;
    }
}

export default async function Experience() {
    const experienceDetails = await fetchExpericneDetail();

    return (
        <div className="timeline">
            <div className="row">
                {experienceDetails &&
                    (experienceDetails?.map(({ to, from, role, experienceDetail, organization }, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-item-inner outer-shadow">
                                <i className="icon"><FaBriefcase /></i>
                                <span>{from} - {to}</span>
                                <h3>{role}</h3>
                                <h4>{organization.title},  {organization.location}</h4>
                                <p>{experienceDetail}</p>
                            </div>
                        </div>
                    )))}
            </div>
        </div>

    )
}
