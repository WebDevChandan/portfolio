import { CopyrightText, Title } from '../components';
import { ContactDetails, ContactForm } from './components';
import './styles/contact.scss';

export default function Conact() {
  return (
    <section className="contact-section section" id="contact">
      <div className="container">

        <Title title='Get in Touch' subTitle='contact' />
        <ContactDetails />
        <ContactForm />

      </div>

      <CopyrightText footerText="| Inc. All Rights Reserved" />

    </section>
  )
}
