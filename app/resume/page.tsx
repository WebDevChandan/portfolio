import prisma from "@/utils/prisma";
import { Suspense } from 'react';
import WaveLoader from '../components/Loader/WaveLoader';
import Title from '../components/Title';
import { Resume } from './components';
import './styles/resume.scss';

const fetchResume = async () => {
    try {
        const resumeFile = await prisma.personalInfo.findFirst({
            select: {
                resume: true,
            }
        })
        return resumeFile;
    } catch (error) {
        console.log("Error Fetching Resume Data: ", error)
        return null;
    }

}

export default async function page() {
    const resumeFile = await fetchResume();

    return (resumeFile &&
        <section className="other-section resume-section" id="resume">
            <div className="container">
                <Title title="Resume" subTitle='View My Resume' />

                <Suspense fallback={<WaveLoader />}>
                    <div className="row">
                        <div className="resume-item-inner outer-shadow">
                            <Resume resumeFile={resumeFile} />
                        </div>
                    </div>
                </Suspense>

            </div>
        </section>
    )
}
