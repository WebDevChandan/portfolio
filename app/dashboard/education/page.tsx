import { Title, WaveLoader } from "@/app/components";
import ModalProvider from "@/app/context/ModalProvider";
import { Suspense } from "react";
import NewEducation from "./components/NewEducation";
import RenderEducation from "./components/RenderEducation";
import { fetchEducationDetails } from "./server/education.action";
import "../styles/education-experience_dash.scss";

export default async function EducationDash() {
    const educationDetails = await fetchEducationDetails();

    return (
        <>
            <Title title="Education" subTitle="View or Edit Education" />
            <Suspense fallback={<WaveLoader />}>
                <ModalProvider>
                    <div className="education">
                        <div className="timeline">
                            <div className="row">
                                <NewEducation />
                                {educationDetails && <RenderEducation educationData={educationDetails} />}
                            </div>
                        </div>
                    </div>
                </ModalProvider>
            </Suspense>
        </>
    )
}
