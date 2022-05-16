import type { NextPage } from "next";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const SignUp: NextPage = () => {
  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader leftIcon={<></>} title="Sign Up" rightIcon={<></>} />
      </div>
    </section>
  );
};

export default SignUp;
