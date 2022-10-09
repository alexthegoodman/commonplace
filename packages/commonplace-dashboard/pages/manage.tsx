import type { NextPage } from "next";

const Manage: NextPage = () => {
  return <h1>Manage</h1>;
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

export default Manage;
