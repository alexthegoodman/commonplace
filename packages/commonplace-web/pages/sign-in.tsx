import type { NextPage } from "next";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const SignIn: NextPage = () => {
  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader leftIcon={<></>} title="Sign In" rightIcon={<></>} />
      </div>
    </section>
  );
};

export default SignIn;
