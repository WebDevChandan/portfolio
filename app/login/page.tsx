import { Logo } from "@/app/components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from "./components/AuthForm";
import './styles/login.scss';


export default async function page() {
  
  return (
    <>
      <section className="other-section login-section" id="about">
        <div className="container">
          <div className="login-form">
            <div className="form-container outer-shadow">
              <div className="logo-container">
                <Logo />
              </div>
              <h2 className="text">Admin Login</h2>
              <ToastContainer />
                <AuthForm />
            </div>
          </div>
        </div>
      </section>

    </>

  )
}
