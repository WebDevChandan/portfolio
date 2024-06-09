"use client";
import { RxCross2 } from 'react-icons/rx';
import '../../styles/validationMessage.scss';

let validationTimeout: NodeJS.Timeout | null = null;


export const validationFieldUI = (currentElement: HTMLElement, inputValid: boolean) => {
    if (inputValid)
        currentElement.style.border = "none"
    else
        currentElement.style.border = "1px solid #cc3a3b";
}

export const showValidMsg = (validationStatus: boolean) => {
    const validMsgContainer = document.querySelector('.valid-msg-container')! as HTMLElement;
    validMsgContainer.classList.add('show');

    if (validationStatus) {
        validMsgContainer.classList.remove('error');
        validMsgContainer.classList.add('success');
    }
    else {
        validMsgContainer.classList.remove('success');
        validMsgContainer.classList.add('error');
    }

    if (validationTimeout) {
        clearTimeout(validationTimeout);
    }

    validationTimeout = setTimeout(() => {
        closeValidMsg();
    }, 3000);
}

const closeValidMsg = () => {
    const validMsgContainer = document.querySelector('.valid-msg-container')! as HTMLElement;
    validMsgContainer.classList.remove('show');
}

export default function ValidationMessage() {
    return (
        <div className="valid-msg-container outer-shadow">
            <p className="valid-msg"></p>
            <div className="valid-message-toggler v-icon outer-shadow hover-in-shadow" onClick={() => { closeValidMsg() }}>
                <i className="fa-cog fa-spin">< RxCross2 /></i>
            </div>
        </div>
    )
}
