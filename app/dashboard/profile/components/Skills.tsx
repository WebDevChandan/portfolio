"use client";
import { ChangeEvent, useContext, useState } from 'react';
import { EditableContext } from '../../context/EditableProvider';
import { ProfileContext } from '../../context/ProfileProvider';

type SkillsType = {
    name: string;
    level: string;
}[];

export default function Skills({ skillsProp }: { skillsProp: SkillsType }) {
    const { isEditable } = useContext(EditableContext);

    const [skillsRangeValues, setSkillsRangeValues] = useState<SkillsType>(skillsProp);

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
                        <div className="range-container inner-shadow">
                            <input
                                type="range"
                                className={`range-bar ${!isEditable ? "disabled" : ""}`}
                                min={0} max={100}
                                value={level}
                                onChange={handleChange}
                                name={name}
                                disabled={!isEditable}
                            />
                            <span className={!isEditable ? "disabled" : ""}>{`${level}%`}</span>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
