"use client";
import { updateProfile } from "../../action";
import { SubSectionTitle } from "../../components";
import MainProfile from "./MainProfile";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";

function ProfileForm() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            await updateProfile(formData);
            console.log("Form submitted successfully");
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <MainProfile />

            <SubSectionTitle title='Social Links' />
            <SocialLinks />

            <SubSectionTitle title='Skills' />
            <Skills />

        </form>
    )
}

export default ProfileForm