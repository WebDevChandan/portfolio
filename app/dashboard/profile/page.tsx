import { Title, WaveLoader } from '@/app/components';
import prisma from '@/utils/prisma';
import { SubSectionTitle } from '../components';
import { EditorActionProvider } from '../context/EditorProvider';
import FileUploadProvider from '../context/FileUploadProvider';
import { ProfileProvider } from '../context/ProfileProvider';
import { Profileheader, ProfileSkills, ProfileSocialLinks } from './components';
import './styles/profile.scss';
import { Suspense } from 'react';

export type ProfileType = {
    aboutImage: string;
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
                aboutImage: true,
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
        <>
            <Title title="Profile" subTitle="View or Edit Profile" />
            <Suspense fallback={<WaveLoader />}>
                <ProfileProvider profileData={profileData}>
                    {profileData &&
                        <>
                            {profileData && (
                                <FileUploadProvider>
                                    <EditorActionProvider defaultContent={profileData.about}>

                                        <Profileheader />

                                        <SubSectionTitle title="Social Links" />
                                        <ProfileSocialLinks />

                                        <SubSectionTitle title="Skills" />
                                        <ProfileSkills />
                                    </EditorActionProvider>
                                </FileUploadProvider>
                            )}
                        </>
                    }
                </ProfileProvider>
            </Suspense>
        </>
    )
}

export default Profile