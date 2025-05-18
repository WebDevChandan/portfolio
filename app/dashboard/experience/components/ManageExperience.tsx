"use client";
import { useModalAction } from "@/app/hook/useModalAction";
import { ChangeEvent, useEffect, useState } from "react";
import { Editor, InputField } from "../../components";
import { useEditorAction } from "../../hook/useEditorAction";
import { ExperienceDetailType, ManageExeprienceProps } from "../../types/ExperienceType";
import { addExperience, updateExperience } from "../server/experience.action";
import '../styles/manage-experience.scss';
import { showToast } from "@/utils/showToast";
import ServerSpinLoader from "@/app/components/Loader/ServerSpinLoader";

export default function ManageExperience({ experience, isNewExperience }: ManageExeprienceProps) {
    const [isExperienceUpdating, setIsExperienceUpdating] = useState<boolean>(false);
    const { setModalPopup } = useModalAction();
    const { isEditable, editorContent, isUpdated, handleCancelEditor } = useEditorAction();
    const [currentExperienceData, setCurrentExperienceData] = useState<ExperienceDetailType[number]>(experience);

    const prevExperienceData: ExperienceDetailType[number] = experience;

    const [hasContentChanged, setHasContentChanged] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setCurrentExperienceData((prev) => ({
                ...prev,
                experienceDetail: editorContent,
            }));
        }

        return () => {
            setCurrentExperienceData((prev) => ({
                ...prev,
                experienceDetail: currentExperienceData.experienceDetail
            }));
        }
    }, [editorContent])

    useEffect(() => {
        if (!isNewExperience) {
            if ((prevExperienceData.role !== currentExperienceData.role ||
                prevExperienceData.organization.title !== currentExperienceData.organization.title ||
                prevExperienceData.organization.location !== currentExperienceData.organization.location ||
                prevExperienceData.to !== currentExperienceData.to ||
                prevExperienceData.from !== currentExperienceData.from ||
                isUpdated)
            )
                setHasContentChanged(true);
            else
                setHasContentChanged(false);

        } else {
            if ((prevExperienceData.role !== currentExperienceData.role &&
                prevExperienceData.organization.title !== currentExperienceData.organization.title &&
                prevExperienceData.organization.location !== currentExperienceData.organization.location &&
                prevExperienceData.to !== currentExperienceData.to &&
                prevExperienceData.from !== currentExperienceData.from &&
                isUpdated)
            )
                setHasContentChanged(true);
            else
                setHasContentChanged(false);
        }
    }, [currentExperienceData, isNewExperience])

    const handleExperienceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name.includes(".")) {
            const [parentKey, childKey] = name.split(".");
            setCurrentExperienceData((prev) => ({
                ...prev,
                [parentKey]: {
                    ...(prev as any)[parentKey],
                    [childKey]: value,
                },
            }));
        } else {
            setCurrentExperienceData((prev) => ({
                ...prev,
                experienceDetail: editorContent,
                [name]: value,
            }));
        }
    };

    const handleCancel = () => {
        setModalPopup(false);

        //Reset Experience Detail as modal closed
        handleCancelEditor();
    }

    const mutateExperienceData = async () => {
        setIsExperienceUpdating(true);
        //Add Experience
        if (isNewExperience) {
            await addExperience(currentExperienceData)
                .then(({ message, errorMessage }) => {
                    if (message) {
                        showToast("success", message)
                        setModalPopup(false);
                    }

                    if (errorMessage) {
                        showToast("error", errorMessage);
                    }
                })
        }
        else {
            //Update Experience
            updateExperience(currentExperienceData);
            await updateExperience(currentExperienceData)
                .then(({ message, errorMessage }) => {
                    if (message) {
                        showToast("success", message)
                        setModalPopup(false);
                    }

                    if (errorMessage) {
                        showToast("error", errorMessage);
                    }
                })
        }

        setIsExperienceUpdating(false);
    }


    return (
        <div className="add-content-container">
            <div className="content-header" style={{ margin: "10px" }}>
                <div className="content-label">{isNewExperience ? "Add" : "Update"} Experience</div>
            </div>

            <div className="add-content" style={{ margin: "0px 0px 10px", padding: "5px 0px" }}>
                <div className="experience-field">
                    <InputField
                        placeholder="Role"
                        value={currentExperienceData.role}
                        specificName="role"
                        handleChangeInput={handleExperienceChange}
                    />
                </div>

                <div className="experience-field">
                    <InputField
                        placeholder="Organization Name"
                        value={currentExperienceData.organization.title}
                        specificName="organization.title"
                        handleChangeInput={handleExperienceChange}
                    />
                </div>

                <div className="experience-field">
                    <InputField
                        placeholder="Organization Location"
                        value={currentExperienceData.organization.location}
                        specificName="organization.location"
                        handleChangeInput={handleExperienceChange}
                    />
                </div>

                <div className="experience-field date-field">
                    <div className="w-50">
                        <InputField
                            placeholder="From (YYYY)"
                            value={currentExperienceData.from}
                            specificName="from"
                            handleChangeInput={handleExperienceChange}
                        />
                    </div>
                    <div className="w-50">
                        <InputField
                            placeholder="To (YYYY)"
                            value={currentExperienceData.to}
                            specificName="to"
                            handleChangeInput={handleExperienceChange}
                        />
                    </div>
                </div>
                <div className="experience-field editor-field">
                    <Editor />
                </div>
            </div>

            <div className="modal-btn">
                <button className={`btn-1 outer-shadow hover-in-shadow`} onClick={handleCancel}> Cancel</button>
                {
                    isExperienceUpdating
                        ? <button className={`btn-1 outer-shadow btn-disabled`}><ServerSpinLoader /> Saving...</button>
                        : <button
                            className={`btn-1 outer-shadow hover-in-shadow ${!hasContentChanged ? 'btn-disabled-without-loader' : ''}`}
                            onClick={mutateExperienceData}
                            disabled={!hasContentChanged}
                        > {isNewExperience ? "Add" : "Update"}</button>
                }
            </div>
        </div>
    )
}
