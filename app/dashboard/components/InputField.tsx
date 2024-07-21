import { ReactElement } from "react";
import { IconType } from "react-icons";
import '../styles/inputField.scss';

type InputFieldType = {
    label?: string,
    icon?: ReactElement<IconType>,
    value: string,
    isTextArea: boolean,
}
export default function InputField({ label, icon, value, isTextArea }: InputFieldType) {
    return (
        <>
            {label && <div className="field-label">
                <label htmlFor={label?.toLocaleLowerCase()}>{label}</label>
            </div>}

            <div className={`input-group outer-shadow ${isTextArea ? "textarea-group" : ""}`}>
                {icon && <span className="fa fa-lock">{icon}</span>}

                {!isTextArea && <input
                    className="input-control"
                    autoComplete="off"
                    id={label?.toLocaleLowerCase()}
                    style={!icon ? { paddingLeft: "15px" } : { paddingLeft: "45px" }}
                    defaultValue={value}
                    readOnly
                    name={label?.toLocaleLowerCase()}
                />}

                {isTextArea && <textarea
                    className="textarea-control"
                    autoComplete="off"
                    defaultValue={value}
                    readOnly
                    name="bio"
                />}
            </div>
        </>
    )
}
