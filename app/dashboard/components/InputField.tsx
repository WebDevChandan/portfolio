import { ChangeEvent, ReactElement, useContext } from "react";
import { IconType } from "react-icons";
import '../styles/inputField.scss';
import { EditableContext } from "../context/EditableProvider";
import Editor from "./Editor";

type InputFieldType = {
    label?: string,
    icon?: ReactElement<IconType>,
    value: string,
    specificName?: string,
    handleChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, icon, value, specificName, handleChangeInput = () => { } }: InputFieldType) {
    const { isEditable, isUpdateable } = useContext(EditableContext);

    return (
        <>
            {label &&
                <div className="field-label">
                    <label htmlFor={label?.toLocaleLowerCase()}>{label}</label>
                </div>}

            <div className={`input-group outer-shadow ${isEditable ? "hover-in-shadow" : "disabled"}`}>
                {icon && <span className="fa fa-lock">{icon}</span>}

                <input
                    className={`input-control ${!isEditable ? "disabled" : ""}`}
                    autoComplete="off"
                    id={label?.toLocaleLowerCase()}
                    style={!icon ? { paddingLeft: "15px" } : { paddingLeft: "45px" }}
                    name={specificName ? specificName : label?.toLocaleLowerCase()}
                    defaultValue={value}
                    onChange={(e) => handleChangeInput(e)}
                    readOnly={!isEditable}         //Here, isEditable help in disabling in UI level (like adding .disabled class)
                    disabled={!isEditable && !isUpdateable}         //Here, !isUpdateable help in disabling in server level (like disabled input element, when there is no update)  
                />
            </div>
        </>
    )
}
