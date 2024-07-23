"use client";
import { ChangeEvent, useState } from "react";
import { InputField, UpdateBtn } from "../../components";

export default function ProfileInfo({ bio }: { bio: string }) {
    const [myBio, setMyBIO] = useState(bio);

    const handleChange = (textArea: ChangeEvent<HTMLTextAreaElement>) => {
        setMyBIO(textArea.target.value);
    }

    return (
        <div className="profile-info">
            <InputField value={myBio} isTextArea={true} handleChangeText={handleChange} />
            <UpdateBtn label='Update Profile' />
        </div>
    )
}
