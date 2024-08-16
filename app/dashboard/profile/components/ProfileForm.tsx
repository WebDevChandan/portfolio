import { updateProfile } from "../../server/action";
import { SubSectionTitle } from "../../components";
import { ProfileType } from "../page";
import MainProfile from "./MainProfile";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";

function ProfileForm({ profileData }: { profileData: ProfileType }) {
    const updateProfileData = updateProfile.bind(null, profileData);
    return (
        <form action={updateProfileData}>
            {profileData && (
                <>
                    <MainProfile
                        aboutImage={profileData?.myImages[1]}
                        bio={profileData ? profileData?.about : " "}
                    />

                    <SubSectionTitle title="Social Links" />
                    <SocialLinks socialLinksProp={profileData.socialLinks} />

                    <SubSectionTitle title="Skills" />
                    <Skills skillsProp={profileData.skills} />
                </>
            )}
        </form>
    );
}

export default ProfileForm;
