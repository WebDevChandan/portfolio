import { Title } from '../components';
import { TestimonialCard, TestimonialNavigation } from './components';
import './styles/testimonial.scss';

export default function Testimonial() {
  return (
    <section className="testimonial-section section" id="testimonial">
      <div className="container">

        <Title title='Client Speak' subTitle='Testimonial' />

        <div className="row">
          <div className="testi-box">
            <div className="testi-slider outer-shadow">
              <div className="testi-slider-container">
                <TestimonialCard />
              </div>
            </div>

            <TestimonialNavigation />

          </div>
        </div>
      </div>
    </section>
  )
}
