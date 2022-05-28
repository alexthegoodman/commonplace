import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import SignInForm from "../components/SignInForm/SignInForm";

const SignIn: NextPage = () => {
  return (
    <section className="signIn">
      <div className="signInInner">
        <PrimaryHeader
          inline={true}
          leftIcon={<></>}
          title="Sign In"
          rightIcon={<></>}
        />
        <div className="formWrapper">
          <SignInForm />
        </div>
        <div className="otherLinks">
          <span>
            Or you may{" "}
            <Link href="/sign-up">
              <a>Sign Up</a>
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
