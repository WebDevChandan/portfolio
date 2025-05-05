"use client";
import ServerSpinLoader from "@/app/components/Loader/ServerSpinLoader";
import { useModalAction } from "@/app/hook/useModalAction";
import { showToast } from "@/utils/showToast";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { InputField } from "../../components";
import { useProfile } from "../../context/ProfileProvider";
import { saveSkills } from "../server/profileAction";
import '../styles/manageSkills.scss';

export type SkillsType = {
    name: string;
    level: string;
}[];

export default function ManageSkills() {
    const { profileData, isProfileUpdating, setIsProfileUpdating } = useProfile();
    const { setModalPopup } = useModalAction();

    const [skills, setSkills] = useState<SkillsType>(profileData ? profileData.skills : []);

    const [newSkill, setNewSkill] = useState({
        name: "",
        level: "0",
    });

    const [hasContentChanged, setHasContentChanged] = useState(false);

    const fetchedSkill = useMemo(() => {
        return skills.filter(skill => skill.name.toLocaleLowerCase().startsWith(newSkill.name.toLocaleLowerCase()));
    }, [skills, newSkill])

    useEffect(() => {
        if (!skills.length)
            setHasContentChanged(false);

        else if (profileData?.skills.length !== skills.length)
            setHasContentChanged(true);

        else {
            const hasSkillsChanged = skills.some(skill =>
                profileData?.skills.some(prevSkill =>
                    prevSkill.name.toLocaleLowerCase() === skill.name.toLocaleLowerCase() && prevSkill.level !== skill.level
                )
            );

            setHasContentChanged(hasSkillsChanged);
        }

    }, [skills]);

    useEffect(() => {
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Enter' && newSkill.name.length) {
                handleAddNewSkill(event);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [newSkill]);


    const handleSaveSkills = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (event.type !== "click") return;

        if (isProfileUpdating || !hasContentChanged) return;

        if (!skills.length) return;

        setIsProfileUpdating(true);

        const { message, errorMessage } = await saveSkills(skills) as { message?: string, errorMessage?: string };

        if (message) {
            setIsProfileUpdating(false);
            setModalPopup(false);
            showToast("success", message);
            return;
        }

        if (errorMessage) {
            showToast("error", errorMessage)
            setIsProfileUpdating(false);
            return;
        }
    }

    const handleSearchSkill = (event: ChangeEvent<HTMLInputElement>) => {
        setNewSkill({
            name: event.target.value.trim(),
            level: "0",
        })
    }

    const handleAddNewSkill = (event: MouseEvent<HTMLButtonElement> | globalThis.KeyboardEvent) => {
        event.preventDefault();

        if (!newSkill.name.trim()) return;

        const isDuplicateSkill = skills.some(skill => skill.name.toLocaleLowerCase() === newSkill.name.trim().toLocaleLowerCase());

        if (isDuplicateSkill) return;

        setSkills([newSkill, ...skills]);

        setNewSkill({
            name: "",
            level: "0",
        });
    }

    const handleDeleteSkill = (skillName: string, skillLevel: string) => {
        if (!parseInt(skillLevel))
            setSkills((skills) =>
                skills.filter((skill) =>
                    skill.name.toLocaleLowerCase() !== skillName.toLocaleLowerCase()
                )
            );

        else if (confirm('Are you sure you want to delete?'))
            setSkills((skills) =>
                skills.filter((skill) =>
                    skill.name.toLocaleLowerCase() !== skillName.toLocaleLowerCase()
                )
            );
    }

    const handleEditSkill = (skillName: string, event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setSkills((skills) =>
            skills.map((skill) =>
                skill.name.toLocaleLowerCase() === skillName.toLocaleLowerCase()
                    ? { ...skill, level: event.target.value }
                    : skill
            )
        )
    }

    return (
        <div className="add-content-container">
            <div className="content-header" style={{ margin: "10px" }}>
                <div className="content-label">Manage skills</div>
                <InputField
                    value={newSkill.name}
                    placeholder="Search or Add new skill"
                    icon={<FaSearch />}
                    deleteIcon={false}
                    handleChangeInput={handleSearchSkill}
                />

            </div>

            <div className="add-content" style={{ margin: "0px 0px 10px", padding: "5px 0px" }}>
                {
                    fetchedSkill.map((skill, index) => (
                        <div className="skill-item modal-skill-item" key={index}>
                            <p>{skill.name}</p>
                            <div className="range-container inner-shadow">
                                <div className="progress-meter" style={{ width: `calc(${skill.level}% - 14px)` }}></div>
                                <input
                                    type="range"
                                    className={`range-bar`}
                                    min={0} max={100}
                                    value={skill.level}
                                    name={skill.name}
                                    onChange={(event) => handleEditSkill(skill.name, event)}
                                />
                                <span>{`${skill.level}%`}</span>
                            </div>
                            <span className="delete-icon">
                                <MdDelete cursor="pointer" color="#cc3a3b" onClick={() => handleDeleteSkill(skill.name, skill.level)} />
                            </span>
                        </div>
                    ))

                }

                {!fetchedSkill.length && <div className="skill-not-found-msg">
                    <p>Add this <span>skill</span> to your profile!</p>
                </div>}

            </div>

            <div className="modal-btn">
                {
                    fetchedSkill.length
                        ? <button onClick={handleSaveSkills} disabled={isProfileUpdating || !hasContentChanged} className={`btn-1 outer-shadow ${isProfileUpdating ? "btn-disabled" : !hasContentChanged ? "btn-disabled-without-loader" : "hover-in-shadow"}`}>{isProfileUpdating && <ServerSpinLoader />} Save Skills</button>
                        : <button onClick={handleAddNewSkill} className={`btn-1 outer-shadow hover-in-shadow`}> Add Skill</button>
                }

            </div>
        </div>
    )
}
