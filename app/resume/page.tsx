import { Suspense } from 'react';
import Title from '../components/Title';
import { Resume } from './components';
import './styles/resume.scss';
import Loading from '../loading';

export default function page() {
    return (
        <section className="resume-section section" id="resume">
            <div className="container">
                <Title title="Resume" subTitle='View My Resume' />
                <Suspense fallback={<Loading />}>
                    <div className="row">
                        <div className="resume-item-inner outer-shadow">
                            <Resume />
                        </div>
                    </div>
                </Suspense>
            </div>
        </section>
    )
}
