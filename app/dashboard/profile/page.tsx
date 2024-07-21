import { MyImage, Title } from '@/app/components';
import { InputField, SubSectionTitle } from '../components';
import UpdateBtn from '../components/UpdateBtn';
import { Skills, SocialLinks } from './components';
import './styles/profile.scss';
import { updateProfile } from '../action';

const Profile = () => {
    const bio = "Hello, My name is Chandan Kumar. I am a Full-Stack Web/Java Developer from Jharkhand, India. I like to code things from scratch and enjoy bringing ideas to life in the browser. I value simple content structure, clean design patterns, and thoughtful interactions. I've done remote work for agencies, consulted for startups, and also worked as a Freelancer in a various online digital platform. I love in turning People's Imagination into Reality.Feel free to take a look at my latest projects on Portfolio Page";

    return (
        <form action={updateProfile}>
            <Title title="Profile" subTitle="View or Edit Profile" />
            <div className="row">
                <div className="profile-img">
                    <MyImage src="Chandan_kumar.webp" />
                </div>

                <div className="profile-info">
                    <InputField value={bio} isTextArea={true} />
                    <UpdateBtn label='Update Profile'/>
                </div>
            </div>

            <SubSectionTitle title='Social Links' />
            <SocialLinks />

            <SubSectionTitle title='Skills' />
            <Skills />

        </form>
    )
}

export default Profile