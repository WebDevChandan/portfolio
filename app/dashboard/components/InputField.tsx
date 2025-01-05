import { ChangeEvent, KeyboardEvent, MouseEvent, ReactElement } from "react";
import { IconType } from "react-icons";
import { MdDelete } from "react-icons/md";
import '../styles/inputField.scss';

type InputFieldType = {
    label?: string,
    icon?: ReactElement<IconType>,
    deleteIcon?: boolean,
    value: string,
    placeholder?: string
    specificName?: string,
    disabled?: boolean,
    handleChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDeleteInput?: () => void
}

export default function InputField({ label, icon, deleteIcon, placeholder, value, specificName, disabled = false,
    handleChangeInput = () => { }, handleDeleteInput = () => { } }: InputFieldType) {

    return (
        <>
            {label &&
                <div className="field-label">
                    <label htmlFor={label?.toLocaleLowerCase()}>{label}</label>
                </div>}

            <div className={`input-group outer-shadow ${disabled ? "disabled" : "hover-in-shadow"}`}>
                {icon && <span className="field-icon">{icon}</span>}

                <input
                    className={`input-control ${disabled ? "disabled" : ""}`}
                    autoComplete="off"
                    placeholder={placeholder}
                    id={label?.toLocaleLowerCase()}
                    style={!icon ? { paddingLeft: "15px" } : { paddingLeft: "45px" }}
                    name={specificName ? specificName.toLocaleLowerCase() : label?.toLocaleLowerCase()}
                    value={value}
                    onChange={handleChangeInput}
                    readOnly={disabled}
                    disabled={disabled}
                />

                {deleteIcon
                    && <span className="delete-icon">
                        <MdDelete onClick={handleDeleteInput} />
                    </span>}
            </div>
        </>
    )
}
