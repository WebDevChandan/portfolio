import { Title } from '@/app/components';
import { updateProfile } from '../action';
import { SubSectionTitle } from '../components';
import EditableProvider from '../context/EditableProvider';
import { MainProfile, ProfileForm, Skills, SocialLinks } from './components';
import './styles/profile.scss';
import prisma from '@/utils/prisma';

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

    return (
        <EditableProvider>
            <Title title="Profile" subTitle="View or Edit Profile" />
            {profileData && <ProfileForm profileData={profileData} />}
        </EditableProvider>
    )
}

export default Profile