import { Suspense } from 'react';
import { Title } from '../components';
import { TestimonialCard, TestimonialNavigation } from './components';
import './styles/testimonial.scss';
import Loading from '../loading';

export default function Testimonial() {
  return (
    <section className="testimonial-section section" id="testimonial">
      <div className="container">

        <Title title='Client Speak' subTitle='Testimonial' />

        <Suspense fallback={<Loading />}>
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
