"use client";
import { ChangeEvent, MouseEvent, MouseEventHandler, useState } from "react";
import { InputField } from "../../components";
import { useProfile } from "../../context/ProfileProvider";
import { addSocialLink } from "../../server/action";
import '../styles/manageSocialLinks.scss';
import { revalidatePath } from "next/cache";
import { allSocialLinks } from "./SocialLinks";


export default function ManageSkills() {
    const { profileData } = useProfile();

    const [skills, setSkill] = useState(profileData ? profileData.skills : []);

    // const handleNewSocialLink = (event: { target: { value: string; }; }) => {
    //     const { value } = event.target;
    //     if (value)
    //         setSocialLinks([
    //             ...socialLinks,
    //             {
    //                 label: value,
    //                 link: "",
    //             }
    //         ])
    // };

    // const handleSocialLinks = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSocialLinks((socialLinks) =>
    //         socialLinks.map((socialLink) =>
    //             socialLink.label.toLocaleLowerCase() === event.target.name.toLocaleLowerCase()
    //                 ? { ...socialLink, link: event.target.value }
    //                 : socialLink
    //         )
    //     );
    // }

    // const handleDeleteSocialLink = (name: string, value: string) => {
    //     if (!value)
    //         setSocialLinks((socialLinks) =>
    //             socialLinks.filter((socialLink) =>
    //                 socialLink.label.toLocaleLowerCase() !== name.toLocaleLowerCase()
    //             )
    //         );

    //     else if (confirm('Are you sure you want to delete?'))
    //         setSocialLinks((socialLinks) =>
    //             socialLinks.filter((socialLink) =>
    //                 socialLink.label.toLocaleLowerCase() !== name.toLocaleLowerCase()
    //             )
    //         );
    // };


    // const handleSaveSocialLinks = async (event: MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     //Handle Save...

    // }


    return (
        // <div className="add-sociallink-container">
        //     <div className="selectSocial">
        //         <div className="socialLink-label">Manage social links</div>
        //         <select
        //             id="newSocialLabel"
        //             onChange={handleNewSocialLink}
        //         >
        //             <option value="">Add new link</option>
        //             {allSocialLinks?.map((socialLink, index) => {
        //                 const isNewSocialLink = !socialLinks.find(
        //                     existedSocialLink => existedSocialLink.label.toLocaleLowerCase() === socialLink.label.toLocaleLowerCase())

        //                 return isNewSocialLink && (
        //                     <option
        //                         key={index}
        //                         value={socialLink.label}
        //                     >
        //                         {socialLink.label}
        //                     </option>
        //                 )
        //             })}
        //         </select>
        //     </div>

        //     <div className="link-container">
        //         {socialLinks.map((socialLink, index) => (
        //             <InputField
        //                 key={index}
        //                 value={socialLink.link}
        //                 placeholder="enter social link"
        //                 specificName={socialLink.label}
        //                 icon={allSocialLinks.find(icon => icon.label === socialLink.label.toLocaleLowerCase())?.icon}
        //                 deleteIcon={true}
        //                 handleChangeInput={handleSocialLinks}
        //                 handleDeleteInput={() => handleDeleteSocialLink(socialLink.label, socialLink.link)}
        //             />
        //         ))}
        //     </div>

        //     {/* <div className="add-link-btn">
        //         <button onClick={handleSaveSocialLinks} className="btn-1 outer-shadow hover-in-shadow">Save Links</button>
        //     </div> */}
        // </div>

        <div className="link-container">
        {
            // skillsRangeValues.map(({ name, level }) => (
                <div className="skill-item">
                    <p>{"html"}</p>
                    <div className={`range-container`}>
                        <input
                            type="range"
                            className={`range-bar`}
                            min={0} max={100}
                            value={50}
                            // onChange={handleChange}
                            name={"html"}
                            // disabled={!isEditable && !isUpdateable}
                        />
                        <span>{`${50}%`}</span>
                    </div>
                </div>
            // ))
        }

        {/* <ModelButton label="Edit Links" children={<ManageSocialLinks />} /> */}
    </div>
    )
}
