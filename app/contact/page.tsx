import { Suspense } from 'react';
import { CopyrightText, Title } from '../components';
import { ContactDetails, ContactForm } from './components';
import './styles/contact.scss';
import Loading from '../components/Loading';

export default function Conact() {
  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <Title title='Get in Touch' subTitle='contact' />

        <Suspense fallback={<Loading />}>
          <ContactDetails />
          <ContactForm />
        </Suspense>
      </div>

      <CopyrightText footerText="| Inc. All Rights Reserved" />

    </section >
  )
}
