"use client";
import { RenderRichText, WaveLoader } from "@/app/components";
import { useModalAction } from "@/app/hook/useModalAction";
import { showToast } from "@/utils/showToast";
import { useEffect, useState } from "react";
import { FaBriefcase, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal } from "../../components";
import { EditorActionProvider } from "../../context/EditorProvider";
import { ExperienceDetailType } from "../../types/ExperienceType";
import { deleteExperience } from "../server/experience.action";
import ManageExperience from "./ManageExperience";

export default function RenderExperience({ experienceData }: { experienceData: ExperienceDetailType }) {
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


    const handleDeleteExperience = async (experience: ExperienceDetailType[number], index: number) => {
        if (confirm("Want to delete education?")) {
            setIsModalLoading(true);
            setDeleteIndex(index);

            await deleteExperience(experience)
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
        (experienceData?.map(({ ...experience }, index) => (
            <div className="timeline-item dash-timeline-item" key={index}>
                <div className="timeline-item-inner outer-shadow">
                    {deleteIndex === index && isModalLoading &&
                        <div className="dash-timeline-loading">
                            <WaveLoader />
                        </div>
                    }
                    <div
                        className="icon"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        style={hoverIndex === index ? { cursor: "pointer" } : { cursor: "auto" }}
                        onClick={() => setActivePopupIndex(index)}
                    >
                        {hoverIndex === index ? <FaEdit cursor="pointer" /> : <FaBriefcase />}
                    </div>
                    <div className="dash-timeline-header">
                        <span>{experience.from} - {experience.to}</span>
                        <div className="delete" onClick={() => handleDeleteExperience(experience, index)}><MdDelete /></div>
                    </div>
                    <h3>{experience.role}</h3>
                    <h4>{experience.organization.title}, {experience.organization.location}</h4>
                    <RenderRichText key={index} text={experience.experienceDetail} />

                    {<EditorActionProvider defaultContent={experience.experienceDetail} defaultOpen={true}>
                        <Modal
                            isModalPopUpOpen={activePopupIndex === index && !isModalLoading}
                            setModalPopupOpen={(val) => val === false && setActivePopupIndex(null)}
                        >
                            <ManageExperience experience={experience} isNewExperience={false} />
                        </Modal>
                    </EditorActionProvider>}
                </div>
            </div>
        )))
    )
}
