import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import ProfileIntro from "../components/ProfileIntro/ProfileIntro";
import ProfilePosts from "../components/ProfilePosts/ProfilePosts";

const Home: NextPage = () => {
  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader
          leftIcon={
            <Link href="/">
              <a>S</a>
            </Link>
          }
          title="Alex Goodman"
          rightIcon={
            <Link href="/">
              <a>Q</a>
            </Link>
          }
        />
        <div className="scrollContainer">
          <ProfileIntro />
          <ProfilePosts />
        </div>
      </div>
    </section>
  );
};

export default Home;
