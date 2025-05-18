"use client";
import { useModalAction } from "@/app/hook/useModalAction";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../../components";
import ManageEducation from "./ManageEducation";
import { useEffect, useState } from "react";
import { EducationDetailType } from "../../types/EducationType";
import { EditorActionProvider } from "../../context/EditorProvider";

export default function NewEducation() {
    const { setModalPopup, isModalLoading } = useModalAction();
    const [newEducationPopup, setNewEducationPopup] = useState(false);

    const newEducation: EducationDetailType[number] =
    {
        id: "",
        from: "",
        to: "",
        info: "",
        degree: "",
        institution: {
            title: "",
            location: ""
        }
    };

    useEffect(() => {
        if (newEducationPopup && !isModalLoading)
            setModalPopup(true);
        else
            setModalPopup(false);

    }, [newEducationPopup, isModalLoading])

    return (
        <div className="timeline-item dashNew-timeline-item">
            <div className="timeline-item-inner" style={{ padding: '15px 0px' }}>
                <div className="icon" style={{ cursor: "pointer" }} onClick={() => setNewEducationPopup(!newEducationPopup)}><FaPlus /></div>
                <EditorActionProvider defaultContent={newEducation.info} defaultOpen={true}>
                    <Modal isModalPopUpOpen={newEducationPopup && !isModalLoading} setModalPopupOpen={setNewEducationPopup} >
                        <ManageEducation education={newEducation} isNewEducation={true} />
                    </Modal>
                </EditorActionProvider>
                <div className="add-new-timeline">
                    <span id="new-timeline-label">Add Education</span>
                </div>
            </div>
        </div>
    )
}
