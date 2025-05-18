import { Title, WaveLoader } from "@/app/components";
import ModalProvider from "@/app/context/ModalProvider";
import { Suspense } from "react";
import { fetchExperienceDetails } from "./server/experience.action";
import "../styles/education-experience_dash.scss";
import RenderExperience from "./components/RenderExperience";
import NewExperience from "./components/NewExperience";

export default async function ExperienceDash() {
    const experienceDetails = await fetchExperienceDetails();

    return (
        <>
            <Title title="Experience" subTitle="View or Edit Experience" />
            <Suspense fallback={<WaveLoader />}>
                <ModalProvider>
                    <div className="education">
                        <div className="timeline">
                            <div className="row">
                                <NewExperience />
                                {experienceDetails && <RenderExperience experienceData={experienceDetails} />}
                            </div>
                        </div>
                    </div>
                </ModalProvider>
            </Suspense>
        </>
    )
}
