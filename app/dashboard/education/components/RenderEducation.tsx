"use client";
import { useModalAction } from "@/app/hook/useModalAction";
import { useEffect, useState } from "react";
import { FaEdit, FaGraduationCap } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal } from "../../components";
import { EditorActionProvider } from "../../context/EditorProvider";
import { EducationDetailType } from "../../types/EducationType";
import ManageEducation from "./ManageEducation";
import { deleteEducation } from "../server/education.action";
import { showToast } from "@/utils/showToast";
import { RenderRichText, WaveLoader } from "@/app/components";

export default function RenderEducation({ educationData }: { educationData: EducationDetailType }) {
    const { setModalPopup, isModalLoading, setIsModalLoading } = useModalAction();

    const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activePopupIndex !== null && !isModalLoading)
            setModalPopup(true);
        else
            setModalPopup(false);

    }, [activePopupIndex, isModalLoading]);

    const handleDeleteEducation = async (education: EducationDetailType[number], index: number) => {
        if (confirm("Want to delete education?")) {
            setIsModalLoading(true);
            setDeleteIndex(index);

            await deleteEducation(education)
                .then(({ message, errorMessage }) => {
                    if (message)
                        showToast("success", message)

                    if (errorMessage) {
                        showToast("error", errorMessage);
                    }
                })

            setIsModalLoading(false);
        }
    }

    return (
        (educationData?.map(({ ...education }, index) => (
            <div className="timeline-item dash-timeline-item" key={index}>
                <div className="timeline-item-inner outer-shadow">
                    {deleteIndex === index && isModalLoading &&
                        <div className="dash-timeline-loading">
                            <WaveLoader />
                        </div>
                    }
                    <div className="icon"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        style={hoverIndex === index ? { cursor: "pointer" } : { cursor: "auto" }}
                        onClick={() => setActivePopupIndex(index)}
                    >
                        {hoverIndex === index ? <FaEdit cursor="pointer" /> : <FaGraduationCap />}
                    </div>
                    <div className="dash-timeline-header">
                        <span>{education.from} - {education.to}</span>
                        <div className="delete" onClick={() => handleDeleteEducation(education, index)}><MdDelete /></div>
                    </div>
                    <h3>{education.degree}</h3>
                    <h4>{education.institution.title}, {education.institution.location}</h4>
                    <RenderRichText key={index} text={education.info} />

                    {<EditorActionProvider defaultContent={education.info} defaultOpen={true}>
                        <Modal
                            isModalPopUpOpen={activePopupIndex === index && !isModalLoading}
                            setModalPopupOpen={(val) => val === false && setActivePopupIndex(null)}
                        >
                            <ManageEducation education={education} isNewEducation={false} />
                        </Modal>
                    </EditorActionProvider>}
                </div>
            </div>
        )))
    )
}
