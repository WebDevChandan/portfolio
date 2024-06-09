import { showValidMsg, validationFieldUI } from "./ValidationMessage";

export const checkAllFields = () => {
    const inputGroup = document.querySelectorAll('.input-group');
    const validMsgContainer = document.querySelector('.valid-msg')! as HTMLElement;
    let foundInvalidElement = false;
    let validationCheck = false;

    if (!validationCheck) {
        inputGroup.forEach((item) => {
            if (foundInvalidElement) return false;

            const currentElement = item.firstChild! as HTMLInputElement;

            if (!checkValidation(currentElement.name, currentElement.value, currentElement)) {
                validationFieldUI(currentElement, false);
                showValidMsg(false);
                foundInvalidElement = true;
                validationCheck = false;
            } else
                validationCheck = true;
        })

    }

    if (validationCheck) {
        //Form BackEnd start from here!
        validMsgContainer.innerText = "Message Sent Successfully! ";
        showValidMsg(true);
    }
}

export const checkValidation = (name: string, value: string, currentElement: HTMLElement): boolean => {
    const validMsgContainer = document.querySelector('.valid-msg')! as HTMLElement;

    if (value.length) {
        if (name === "name" || name === "subject") {
            const fieldValue = value.replace(/[^a-zA-Z0-9]/g, '');
            if (fieldValue.length >= 5) {
                validationFieldUI(currentElement, true);
                return true;
            }
            else {
                if (name === "subject")
                    validMsgContainer.innerText = "Subject is Too Short";
                else
                    validMsgContainer.innerText = "Enter Your Full Name";

                validationFieldUI(currentElement, false);
                return false;
            }
        } else if (name === "email") {
            const userEmail = value.replace(/[^a-zA-Z0-9@.]/g, '');
            if (userEmail.length >= 5 && userEmail.split("@")[1] === "gmail.com" && userEmail.split("@")[0].length > 3) {
                validationFieldUI(currentElement, true);
                return true;
            }
            else {
                validMsgContainer.innerText = "Enter Valid Gmail ID";
                validationFieldUI(currentElement, false);
                return false;
            }
        } else if (name === "message" && value.length > 20) {
            validationFieldUI(currentElement, true);
            return true;
        }
        else {
            validMsgContainer.innerText = "Message is too Short!";
            validationFieldUI(currentElement, false);
            return false;
        }
    }

    validationFieldUI(currentElement, false);
    validMsgContainer.innerText = `${name.toUpperCase()} Is Empty`;
    return false;
}
