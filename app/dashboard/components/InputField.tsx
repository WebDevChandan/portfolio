import { ChangeEvent, ReactElement, useContext } from "react";
import { IconType } from "react-icons";
import '../styles/inputField.scss';
import { EditableContext } from "../context/EditableProvider";
import { useProfile } from "../context/ProfileProvider";
import { MdDelete } from "react-icons/md";

type InputFieldType = {
    label?: string,
    icon?: ReactElement<IconType>,
    deleteIcon?: boolean,
    value: string,
    placeholder?: string
    specificName?: string,
    handleChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDeleteInput?: () => void
}

export default function InputField({ label, icon, deleteIcon, placeholder, value, specificName, handleChangeInput = () => { }, handleDeleteInput = () => { } }: InputFieldType) {
    const { isEditable, isUpdateable } = useProfile();

    return (
        <>
            {label &&
                <div className="field-label">
                    <label htmlFor={label?.toLocaleLowerCase()}>{label}</label>
                </div>}

            <div className={`input-group outer-shadow ${isEditable ? "hover-in-shadow" : "disabled"}`}>
                {icon && <span className="field-icon">{icon}</span>}

                <input
                    className={`input-control ${!isEditable ? "disabled" : ""}`}
                    autoComplete="off"
                    placeholder={placeholder}
                    id={label?.toLocaleLowerCase()}
                    style={!icon ? { paddingLeft: "15px" } : { paddingLeft: "45px" }}
                    name={specificName ? specificName.toLocaleLowerCase() : label?.toLocaleLowerCase()}
                    defaultValue={value}
                    onChange={(e) => handleChangeInput(e)}
                    readOnly={!isEditable}         //Here, isEditable help in disabling in UI level (like adding .disabled class)
                    disabled={!isEditable && !isUpdateable}         //Here, !isUpdateable help in disabling in server level (like disabled input element, when there is no update)  
                />

                {deleteIcon
                    && <span className="delete-icon">
                        <MdDelete onClick={handleDeleteInput} />
                    </span>}
            </div>
        </>
    )
}
