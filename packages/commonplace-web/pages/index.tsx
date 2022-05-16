import type { NextPage } from "next";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import SignInForm from "../components/SignInForm/SignInForm";

const Home: NextPage = () => {
  return (
    <>
      <PrimaryHeader leftIcon={<></>} title="Sign In" rightIcon={<></>} />
      <div className="formWrapper">
        <SignInForm />
      </div>
    </>
  );
};

export default Home;
