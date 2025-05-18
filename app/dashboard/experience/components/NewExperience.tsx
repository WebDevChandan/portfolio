"use client";
import { useModalAction } from "@/app/hook/useModalAction";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../../components";
import { EditorActionProvider } from "../../context/EditorProvider";
import { ExperienceDetailType } from "../../types/ExperienceType";
import ManageExperience from "./ManageExperience";

export default function NewExperience() {
    const { setModalPopup } = useModalAction();
    const [newExperiencePopup, setNewExperiencePopup] = useState(false);

    const newExperience: ExperienceDetailType[number] =
    {
        id: "",
        from: "",
        to: "",
        role: "",
        experienceDetail: "",
        organization: {
            title: "",
            location: ""
        }
    };

    useEffect(() => {
        if (newExperiencePopup)
            setModalPopup(true);
        else
            setModalPopup(false);

    }, [newExperiencePopup])

    return (
        <div className="timeline-item dashNew-timeline-item">
            <div className="timeline-item-inner" style={{ padding: '15px 0px' }}>
                <div className="icon" style={{ cursor: "pointer" }} onClick={() => setNewExperiencePopup(!newExperiencePopup)}><FaPlus /></div>
                <EditorActionProvider defaultContent={newExperience.experienceDetail} defaultOpen={true}>
                    <Modal isModalPopUpOpen={newExperiencePopup} setModalPopupOpen={setNewExperiencePopup} >
                        <ManageExperience experience={newExperience} isNewExperience={true} />
                    </Modal>
                </EditorActionProvider>
                <div className="add-new-timeline">
                    <span id="new-timeline-label">Add Experience</span>
                </div>
            </div>
        </div>
    )
}
