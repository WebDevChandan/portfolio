"use client";
import { MyImage } from "@/app/components";
import { ChangeEvent, useState } from "react";
import { SlPencil } from "react-icons/sl";
import ProfileInfo from "./ProfileInfo";

export default function MainProfile() {
    const [image, setImage] = useState();
    const bio = "Hello, My name is Chandan Kumar. I am a Full-Stack Web/Java Developer from Jharkhand, India. I like to code things from scratch and enjoy bringing ideas to life in the browser. I value simple content structure, clean design patterns, and thoughtful interactions. I've done remote work for agencies, consulted for startups, and also worked as a Freelancer in a various online digital platform. I love in turning People's Imagination into Reality.Feel free to take a look at my latest projects on Portfolio Page";


    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    }
    return (
        <div className="row">
            <div className="profile-img">
                <SlPencil />
                <input type="file" name="image" id="image" onChange={handleImage} accept="image/*"/>
                <MyImage src="Chandan_Kumar.webp" />
            </div>

            <ProfileInfo bio={bio} />
        </div>
    )
}
