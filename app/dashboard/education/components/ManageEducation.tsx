"use client";
import { useModalAction } from "@/app/hook/useModalAction";
import { ChangeEvent, useEffect, useState } from "react";
import { Editor, InputField } from "../../components";
import { useEditorAction } from "../../hook/useEditorAction";
import { EducationDetailType, ManageEducationProps } from "../../types/EducationType";
import '../styles/manage-education.scss';
import { addEducation, updateEducation } from "../server/education.action";
import { showToast } from "@/utils/showToast";
import ServerSpinLoader from "@/app/components/Loader/ServerSpinLoader";

export default function ManageEducation({ education, isNewEducation }: ManageEducationProps) {
    const [isEducationUpdating, setIsEducationUpdating] = useState<boolean>(false);
    const { setModalPopup } = useModalAction();
    const { isEditable, editorContent, isUpdated, handleCancelEditor } = useEditorAction();
    const [currentEducationData, setCurrentEducationData] = useState<EducationDetailType[number]>(education);

    const prevEducationData: EducationDetailType[number] = education;

    const [hasContentChanged, setHasContentChanged] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setCurrentEducationData((prev) => ({
                ...prev,
                info: editorContent,
            }));
        }

        return () => {
            setCurrentEducationData((prev) => ({
                ...prev,
                info: currentEducationData.info
            }));
        }
    }, [editorContent])

    useEffect(() => {
        if (!isNewEducation) {
            if (
                (prevEducationData.degree !== currentEducationData.degree ||
                    prevEducationData.institution.title !== currentEducationData.institution.title ||
                    prevEducationData.institution.location !== currentEducationData.institution.location ||
                    prevEducationData.to !== currentEducationData.to ||
                    prevEducationData.from !== currentEducationData.from ||
                    isUpdated)
            )
                setHasContentChanged(true);
            else
                setHasContentChanged(false);

        } else {
            if (
                (prevEducationData.degree !== currentEducationData.degree &&
                    prevEducationData.institution.title !== currentEducationData.institution.title &&
                    prevEducationData.institution.location !== currentEducationData.institution.location &&
                    prevEducationData.to !== currentEducationData.to &&
                    prevEducationData.from !== currentEducationData.from &&
                    isUpdated)
            )
                setHasContentChanged(true);
            else
                setHasContentChanged(false);
        }
    }, [currentEducationData, isNewEducation])

    const handleEducationChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name.includes(".")) {
            const [parentKey, childKey] = name.split(".");
            setCurrentEducationData((prev) => ({
                ...prev,
                [parentKey]: {
                    ...(prev as any)[parentKey],
                    [childKey]: value,
                },
            }));
        } else {
            setCurrentEducationData((prev) => ({
                ...prev,
                info: editorContent,
                [name]: value,
            }));
        }
    };

    const handleCancel = () => {
        setModalPopup(false);

        //Reset Edu-info as modal closed
        handleCancelEditor();
    }

    const mutateEducationData = async () => {
        setIsEducationUpdating(true);

        //Add Education
        if (isNewEducation) {
            await addEducation(currentEducationData)
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
            await updateEducation(currentEducationData)
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

        setIsEducationUpdating(false);
    }

    return (
        <div className="add-content-container">
            <div className="content-header" style={{ margin: "10px" }}>
                <div className="content-label">{isNewEducation ? "Add" : "Update"} Education</div>
            </div>

            <div className="add-content" style={{ margin: "0px 0px 10px", padding: "5px 0px" }}>
                <div className="education-field">
                    <InputField
                        placeholder="Degree"
                        value={currentEducationData.degree}
                        specificName="degree"
                        handleChangeInput={handleEducationChange}
                    />
                </div>

                <div className="education-field">
                    <InputField
                        placeholder="Institution Name"
                        value={currentEducationData.institution.title}
                        specificName="institution.title"
                        handleChangeInput={handleEducationChange}
                    />
                </div>

                <div className="education-field">
                    <InputField
                        placeholder="Institution Location"
                        value={currentEducationData.institution.location}
                        specificName="institution.location"
                        handleChangeInput={handleEducationChange}
                    />
                </div>

                <div className="education-field date-field">
                    <div className="w-50">
                        <InputField
                            placeholder="From (YYYY)"
                            value={currentEducationData.from}
                            specificName="from"
                            handleChangeInput={handleEducationChange}
                        />
                    </div>
                    <div className="w-50">
                        <InputField
                            placeholder="To (YYYY)"
                            value={currentEducationData.to}
                            specificName="to"
                            handleChangeInput={handleEducationChange}
                        />
                    </div>
                </div>
                <div className="education-field editor-field">
                    <Editor />
                </div>
            </div>

            <div className="modal-btn">
                <button className={`btn-1 outer-shadow hover-in-shadow`} onClick={handleCancel}> Cancel</button>
                {
                    isEducationUpdating
                        ? <button className={`btn-1 outer-shadow btn-disabled`}> <ServerSpinLoader /> Saving...</button>
                        : <button
                            className={`btn-1 outer-shadow hover-in-shadow ${!hasContentChanged ? 'btn-disabled-without-loader' : ''}`}
                            onClick={mutateEducationData}
                            disabled={!hasContentChanged}
                        >
                            {isNewEducation ? "Add" : "Update"}
                        </button>
                }
            </div>
        </div>
    )
}
