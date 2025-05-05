"use client";
import '@/app/about/styles/skills.scss';
import ModalProvider from '@/app/context/ModalProvider';
import ModalButton from '../../components/ModalButton';
import { useProfile } from '../../context/ProfileProvider';
import ManageSkills from './ManageSkills';

export default function ProfileSkills() {
    const { profileData } = useProfile();

    return (
        <ModalProvider>
            <div className="skills">
                <div className="row">
                    {profileData?.skills &&
                        profileData.skills.map(({ name, level }, index) => (
                            <div className="skill-item" key={index}>
                                <p>{name}</p>
                                <div className="progress inner-shadow">
                                    <div className="progress-bar" style={{ width: `calc(${level}% - 14px)` }}>
                                        <span className='progress-level'>{level}%</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <ModalButton label="Edit Skills">
                        <ManageSkills />
                    </ModalButton>
                </div>
            </div>
        </ModalProvider>

    )
}
