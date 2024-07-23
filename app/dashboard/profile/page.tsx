import { Title } from '@/app/components';
import { updateProfile } from '../action';
import { SubSectionTitle } from '../components';
import EditableProvider from '../context/EditableProvider';
import { MainProfile, Skills, SocialLinks } from './components';
import './styles/profile.scss';

const Profile = () => {
    return (
        <form action={updateProfile}>
            <Title title="Profile" subTitle="View or Edit Profile" />
            <EditableProvider>

                <MainProfile />

                <SubSectionTitle title='Social Links' />
                <SocialLinks />

                <SubSectionTitle title='Skills' />
                <Skills />

            </EditableProvider>
        </form>
    )
}

export default Profile