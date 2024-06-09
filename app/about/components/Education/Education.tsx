import { PrismaClient } from '@prisma/client';
import { FaGraduationCap } from 'react-icons/fa'

const prisma = new PrismaClient();

const fetchEducationDetail = async () => {
    try {
        const experienceDetail = await prisma.education.findMany({
            select: {
                from: true,
                to: true,
                level: true,
                info: true,
                institution: {
                    select: {
                        title: true,
                        location: true,
                    }
                }
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
                {educationDetails &&
                    (educationDetails?.map(({ from, to, level, info, institution }, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-item-inner outer-shadow">
                                <i className="icon"><FaGraduationCap /></i>
                                <span>{from} - {to}</span>
                                <h3>{level}</h3>
                                <h4>{institution.title}, {institution.location}</h4>
                                <p dangerouslySetInnerHTML={{ __html: info }} />

                            </div>
                        </div>
                    )))}
            </div>
        </div>
    )
}
