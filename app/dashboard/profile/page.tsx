import { Title } from '@/app/components';
import prisma from '@/utils/prisma';
import { SubSectionTitle } from '../components';
import EditableProvider from '../context/EditableProvider';
import { updateProfile } from '../server/action';
import { MainProfile, ProfileSkills, ProfileSocialLinks } from './components';
import './styles/profile.scss';
import { ProfileProvider } from '../context/ProfileProvider';

export type ProfileType = {
    myImages: string[];
    about: string;
    socialLinks: {
        label: string;
        link: string;
    }[];
    skills: {
        name: string;
        level: string;
    }[];
} | null;

const fetchProfileDetails = async (): Promise<ProfileType> => {
    try {
        const profileData = await prisma.personalInfo.findFirst({
            select: {
                myImages: true,
                about: true,
                socialLinks: true,
                skills: true
            }
        });

        return profileData;

    } catch (error) {
        throw new Error(`Error Fetching Home Details: ${error}`);
    }

}

const Profile = async () => {
    const profileData = await fetchProfileDetails();
    const updateProfileData = updateProfile.bind(null, profileData);

    return (
        <ProfileProvider profileData={profileData}>
            <Title title="Profile" subTitle="View or Edit Profile" />
            {profileData &&
                <form action={updateProfileData}>
                    {profileData && (
                        <>
                            <MainProfile />

                            <SubSectionTitle title="Social Links" />
                            <ProfileSocialLinks />

                            <SubSectionTitle title="Skills" />
                            <ProfileSkills />
                        </>
                    )}
                </form>
            }
        </ProfileProvider>
    )
}

export default Profile