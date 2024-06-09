import { InputFields, Submit, TextareaField } from '..'

export default function Form() {
    return (
        <form className="contact-form contact__form" method="post">
            <div className="row">
                <InputFields />
                <TextareaField />
            </div>

            <Submit />
        </form>
    )
}
