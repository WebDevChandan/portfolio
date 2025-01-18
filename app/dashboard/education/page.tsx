import { Education } from "@/app/about/components";
import { Button, Title } from "@/app/components";
import "./styles/education-experience_dash.scss";
import { fetchEducationDetails } from "./server/educationAction";
import { FaGraduationCap, FaPlus } from "react-icons/fa";
import NewEducation from "./components/NewEducation";
import RenderEducation from "./components/RenderEducation";

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
