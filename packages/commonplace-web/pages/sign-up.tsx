import type { NextPage } from "next";
import Link from "next/link";
import AuthForm from "../components/AuthForm/AuthForm";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const SignUp: NextPage = () => {
  return (
    <section className="signUp">
      <div className="signUpInner">
        <PrimaryHeader
          inline={true}
          leftIcon={<></>}
          title="Sign Up"
          rightIcon={<></>}
        />
        <main>
          <div className="formWrapper">
            <AuthForm type="sign-up" />
          </div>
          <div className="otherLinks">
            <span>
              Or you may{" "}
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            </span>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignUp;
