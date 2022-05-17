import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import ProfileIntro from "../components/ProfileIntro/ProfileIntro";
import ProfilePosts from "../components/ProfilePosts/ProfilePosts";

const Profile: NextPage = () => {
  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader
          className="whiteHeader"
          leftIcon={
            <Link href="/settings">
              <a>S</a>
            </Link>
          }
          title="Alex Goodman"
          rightIcon={
            <Link href="/queue">
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

export default Profile;
