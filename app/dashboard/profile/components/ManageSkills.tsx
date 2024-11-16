"use client";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { InputField } from "../../components";
import { useProfile } from "../../context/ProfileProvider";
import '../styles/manageSkills.scss';

export default function ManageSocialLinks() {
    const { profileData } = useProfile();

    const [skills, setSkills] = useState(profileData ? profileData.skills : []);

    const [newSkill, setNewSkill] = useState({
        name: "",
        level: "0",
    });

    const fetchedSkill = useMemo(() => {
        return skills.filter(skill => skill.name.toLocaleLowerCase().startsWith(newSkill.name.toLocaleLowerCase()));
    }, [skills, newSkill])

    const handleSaveSocialLinks = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        //Will Handle Skill Save...
    }

    const handleSearchSkill = (event: ChangeEvent<HTMLInputElement>) => {
        setNewSkill({
            name: event.target.value.trim(),
            level: "0",
        })
    }

    const handleAddNewSkill = () => {
        if (!newSkill.name.trim()) return;

        const isDuplicateSkill = skills.some(skill => skill.name.toLocaleLowerCase() === newSkill.name.trim().toLocaleLowerCase());

        console.log(isDuplicateSkill);
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
                    specificName="SkillSearchBar"
                    handleChangeInput={handleSearchSkill}
                />
            </div>

            <div className="add-content" style={{ margin: "0px 0px 10px", padding: "5px 0px" }}>
                {
                    fetchedSkill.map((skill, index) => (
                        <div className="skill-item model-skill-item" style={{ maxWidth: "95%" }} key={index}>
                            <p>{skill.name}</p>
                            <div className={`range-container`}>
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
                    <p>Add this skill to profile!</p>
                </div>}

            </div>

            <div className="model-btn">
                {
                    fetchedSkill.length
                        ? <button onClick={handleSaveSocialLinks} className="btn-1 outer-shadow hover-in-shadow">Save Skills</button>
                        : <button onClick={handleAddNewSkill} className="btn-1 outer-shadow hover-in-shadow">Add Skill</button>
                }

            </div>
        </div>
    )
}
