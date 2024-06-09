"use client";
import { validationFieldUI } from "./ValidationMessage";
import { checkValidation } from "./ValidationRules";

export default function InputFields() {
    const inputFieldData = [
        {
            validationId: "username",
            type: 'text',
            placeholder: 'Full Name',
            name: 'name',
            id: 'userName'
        },
        {
            validationId: "emailId",
            type: 'email',
            placeholder: 'Email',
            name: 'email',
            id: 'email'
        },
        {
            validationId: "subject",
            type: 'text',
            placeholder: 'Subject',
            name: 'subject',
            id: 'subject',
        },
    ]

    return (
        <div className="w-50">
            {inputFieldData.map(({ type, placeholder, name, id }, index) => (
                <div className="input-group outer-shadow hover-in-shadow" key={index}>
                    <input type={type} placeholder={placeholder} className="input-control" name={name} id={id ? id : ""} autoComplete="off" required
                        onChange={(e) => {
                            if (!e.target.value) {
                                validationFieldUI(e.currentTarget, true);
                                return;
                            }
                            checkValidation(name, e.target.value.toString(), e.currentTarget);
                        }}
                    />
                </div>
            ))
            }

        </div>

    )
}
