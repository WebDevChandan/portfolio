import { RenderRichText } from '@/app/components';
import prisma from '@/utils/prisma';
import { Suspense } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const fetchEducationDetail = async () => {
    try {
        const experienceDetail = await prisma.education.findMany({
            select: {
                to: true,
                from: true,
                degree: true,
                info: true,
                institution: {
                    select: {
                        title: true,
                        location: true,
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return experienceDetail;
    } catch (error) {
        console.log("Error Education Data: ", error)
        return null;
    }
}
export default async function Education() {
    const educationDetails = await fetchEducationDetail();

    return (
        <div className="timeline">
            <div className="row">
                <Suspense>
                    {educationDetails &&
                        (educationDetails?.map(({ from, to, degree, info, institution }, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-item-inner outer-shadow">
                                    <i className="icon"><FaGraduationCap /></i>
                                    <span>{from} - {to}</span>
                                    <h3>{degree}</h3>
                                    <h4>{institution.title}, {institution.location}</h4>
                                    <RenderRichText text={info} />
                                </div>
                            </div>
                        )))}
                </Suspense>
            </div>
        </div>
    )
}
