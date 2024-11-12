"use client";
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { EditableContext } from '../../context/EditableProvider';
import { useProfile } from '../../context/ProfileProvider';
import { ManageSocialLinks, ModelButton } from '.';
import ManageSkills from './ManageSkills';

type SkillsType = {
    name: string;
    level: string;
}[];

export default function Skills({ skillsProp }: { skillsProp: SkillsType }) {
    const { isEditable, setIsUpdateable, isUpdateable } = useProfile();

    const [skillsRangeValues, setSkillsRangeValues] = useState<SkillsType>(skillsProp);

    useEffect(() => {
        const hasLevelChanged = skillsRangeValues.some(({ name, level }) => {
            const initialLevel = skillsProp.find(skl => skl.name === name)?.level;
            return level !== initialLevel;
        });

        setIsUpdateable(hasLevelChanged);
    }, [skillsRangeValues, skillsProp, setIsUpdateable]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSkillsRangeValues((skills) =>
            skills.map((skill) =>
                skill.name.toLocaleLowerCase() === event.target.name.toLocaleLowerCase()
                    ? { ...skill, level: event.target.value }
                    : skill
            )
        )
    };

    return (
        <div className="row">
            {
                skillsRangeValues.map(({ name, level }) => (
                    <div className="skill-item" key={name}>
                        <p>{name}</p>
                        <div className={`range-container`}>
                            <input
                                type="range"
                                className={`range-bar ${!isEditable ? "disabled" : ""}`}
                                min={0} max={100}
                                value={level}
                                onChange={handleChange}
                                name={name}
                                disabled={!isEditable && !isUpdateable}
                            />
                            <span className={!isEditable ? "disabled" : ""}>{`${level}%`}</span>
                        </div>
                    </div>
                ))
            }

            <ModelButton label="Edit Links" children={<ManageSkills />} />
        </div>
    )
}
