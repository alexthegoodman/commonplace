import type { NextPage } from "next";
import Link from "next/link";
import AuthForm from "../components/AuthForm/AuthForm";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

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
        <main>
          <div className="formWrapper">
            <AuthForm type="sign-in" />
          </div>
          <div className="otherLinks">
            <span>
              Or you may{" "}
              <Link href="/sign-up">
                <a>Sign Up</a>
              </Link>
            </span>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignIn;
