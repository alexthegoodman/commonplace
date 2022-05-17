import type { NextPage } from "next";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import SignInForm from "../components/SignInForm/SignInForm";

const SignIn: NextPage = () => {
  return (
    <section className="signIn">
      <div className="signInInner">
        <PrimaryHeader leftIcon={<></>} title="Sign In" rightIcon={<></>} />
        <div className="formWrapper">
          <SignInForm />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
