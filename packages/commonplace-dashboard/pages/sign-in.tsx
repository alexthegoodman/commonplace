import type { NextPage } from "next";
import AuthForm from "../components/AuthForm/AuthForm";

const SignIn: NextPage = () => {
  return (
    <main>
      <h1>Sign In</h1>
      <AuthForm />
    </main>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      fallback: {
        signInKey: null,
      },
    },
  };
}

export default SignIn;
