import { Title } from "@/app/components";
import NewEducation from "./components/NewEducation";
import RenderEducation from "./components/RenderEducation";
import { fetchEducationDetails } from "./server/educationAction";
import "./styles/education-experience_dash.scss";

export default async function EducationDash() {
    const educationDetails = await fetchEducationDetails();

    return (
        <>
            <Title title="Education" subTitle="View or Edit Education" />
            <div className="education">
                <div className="timeline">
                    <div className="row">
                        <NewEducation />
                        {educationDetails && <RenderEducation educationDetails = {educationDetails}/>}
                    </div>
                </div>
            </div>
        </>
    )
}
