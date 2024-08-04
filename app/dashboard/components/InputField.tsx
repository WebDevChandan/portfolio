import { ChangeEvent, ReactElement, useContext } from "react";
import { IconType } from "react-icons";
import '../styles/inputField.scss';
import { EditableContext } from "../context/EditableProvider";
import Editor from "./Editor";

type InputFieldType = {
    label?: string,
    icon?: ReactElement<IconType>,
    value: string,
    isTextArea: boolean,
    handleChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, icon, value, handleChangeInput = () => { } }: InputFieldType) {
    const { isEditable } = useContext(EditableContext);

    return (
        <>
            {label &&
                <div className="field-label">
                    <label htmlFor={label?.toLocaleLowerCase()}>{label}</label>
                </div>}

            <div className={`input-group outer-shadow ${isEditable ? "hover-in-shadow" : "disabled"}`}>
                {icon && <span className="fa fa-lock">{icon}</span>}

                <input
                    className="input-control"
                    autoComplete="off"
                    id={label?.toLocaleLowerCase()}
                    style={!icon ? { paddingLeft: "15px" } : { paddingLeft: "45px" }}
                    name={label?.toLocaleLowerCase()}
                    defaultValue={value}
                    onChange={(e) => handleChangeInput(e)}
                    readOnly={!isEditable}
                    disabled={!isEditable}
                />
            </div>
        </>
    )
}
