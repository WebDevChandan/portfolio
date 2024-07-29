import { Suspense } from 'react';
import { Title, WaveLoader } from '../components';
import { TestimonialCard, TestimonialNavigation } from './components';
import './styles/testimonial.scss';

export default function Testimonial() {
  return (
    <section className="other-section testimonial-section" id="testimonial">
      <div className="container">

        <Title title='Client Speak' subTitle='Testimonial' />

        <Suspense fallback={<WaveLoader />}>
          <div className="row">
            <div className="testi-box">
              <div className="testi-slider outer-shadow">
                <TestimonialCard />
              </div>

              <TestimonialNavigation />

            </div>
          </div>
        </Suspense>
      </div>
    </section>
  )
}
