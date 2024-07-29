import { Suspense } from 'react';
import { CopyrightText, Title, WaveLoader } from '../components';
import { ContactDetails, ContactForm } from './components';
import './styles/contact.scss';

export default function Conact() {
  return (
    <section className="other-section contact-section" id="contact">
      <div className="container">
        <Title title='Get in Touch' subTitle='contact' />

        <Suspense fallback={<WaveLoader />}>
          <ContactDetails />
          <ContactForm />
        </Suspense>
      </div>

      <CopyrightText footerText="| Inc. All Rights Reserved" />

    </section >
  )
}
