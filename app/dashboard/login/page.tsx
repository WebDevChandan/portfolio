import { Logo } from "@/app/components";
import AuthForm from "./components/AuthForm";
import './styles/login.scss';

export default function page() {
  return (
    <section className="other-section section" id="about">
      <div className="container">
        <div className="login-form">
          <div className="form-container outer-shadow">
            <div className="logo-container">
              <Logo />
            </div>
            <h2 className="text">Admin Login</h2>
            <AuthForm />
          </div>
        </div>
      </div>
    </section>


  )
}
