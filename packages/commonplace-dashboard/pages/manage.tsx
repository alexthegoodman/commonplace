import type { NextPage } from "next";
import ManagementNavigation from "../components/ManagementNavigation/ManagementNavigation";

const Manage: NextPage = () => {
  return (
    <main>
      <ManagementNavigation />
      <h1>Manage Posts</h1>
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

export default Manage;
