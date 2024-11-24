import { Title } from '@/app/components';
import prisma from '@/utils/prisma';
import { SubSectionTitle } from '../components';
import EditableProvider from '../context/EditableProvider';
import { updateProfile } from '../server/action';
import { Profileheader, ProfileSkills, ProfileSocialLinks } from './components';
import './styles/profile.scss';
import { ProfileProvider } from '../context/ProfileProvider';
import FileUploadProvider from '../context/FileUploadProvider';

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
        <>
            <Title title="Profile" subTitle="View or Edit Profile" />
            <ProfileProvider profileData={profileData}>
                {profileData &&
                    <form action={updateProfileData}>
                        {profileData && (
                            <FileUploadProvider>
                                <Profileheader />

                                <SubSectionTitle title="Social Links" />
                                <ProfileSocialLinks />

                                <SubSectionTitle title="Skills" />
                                <ProfileSkills />
                            </FileUploadProvider>
                        )}
                    </form>
                }
            </ProfileProvider>
        </>
    )
}

export default Profile