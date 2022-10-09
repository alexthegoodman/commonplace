import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <section>
      <h1>CommonPlace Admin</h1>
      <Link href="/dashboard">KPI Dashboard</Link>
      <Link href="/manage">Management Tool</Link>
    </section>
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

export default Home;
