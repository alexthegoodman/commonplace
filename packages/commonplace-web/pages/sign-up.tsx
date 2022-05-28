import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import SignUpForm from "../components/SignUpForm/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <section className="signUp">
      <div className="signUpInner">
        <PrimaryHeader leftIcon={<></>} title="Sign Up" rightIcon={<></>} />
        <div className="formWrapper">
          <SignUpForm />
        </div>
        <div className="otherLinks">
          <span>
            Or you may{" "}
            <Link href="/sign-in">
              <a>Sign In</a>
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
