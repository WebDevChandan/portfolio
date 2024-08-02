import { Title } from '@/app/components';
import { updateProfile } from '../action';
import { SubSectionTitle } from '../components';
import EditableProvider from '../context/EditableProvider';
import { MainProfile, ProfileForm, Skills, SocialLinks } from './components';
import './styles/profile.scss';

const Profile = () => {
    return (
        <EditableProvider>
            <Title title="Profile" subTitle="View or Edit Profile" />
            <ProfileForm/>
        </EditableProvider>
    )
}

export default Profile