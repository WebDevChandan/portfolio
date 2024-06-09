"use client";
import { FaMicrophone } from "react-icons/fa";
import { validationFieldUI } from "./ValidationMessage";
import { checkValidation } from "./ValidationRules";

export default function TextareaField() {

    return (
        <div className="w-50">
            <div className="input-group outer-shadow hover-in-shadow">
                <textarea className="input-control" placeholder="Message" name="message" id="message" required
                    onChange={(e) => {
                        if (!e.target.value) {
                            validationFieldUI(e.currentTarget, true);
                            return;
                        }
                        checkValidation(e.currentTarget.name, e.target.value.toString(), e.currentTarget)
                    }}>
                </textarea>
                <span id="microphone"><FaMicrophone /></span>
            </div>
        </div>
    )
}
