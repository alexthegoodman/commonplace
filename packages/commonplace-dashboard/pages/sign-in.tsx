import type { NextPage } from "next";

const SignIn: NextPage = () => {
  return <h1>Sign In</h1>;
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
