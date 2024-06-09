import Title from '../components/Title';
import { Resume } from './components';
import './styles/resume.scss';

export default function page() {
    return (
        <section className="resume-section section" id="resume">
            <div className="container">
                <Title title="Resume" subTitle='View My Resume' />

                <div className="row">
                    <div className="resume-item-inner outer-shadow">
                        <Resume />
                    </div>
                </div>
            </div>
        </section>
    )
}
