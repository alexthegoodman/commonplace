import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const Profile: NextPage = () => {
  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader
          leftIcon={<></>}
          title="Alex Goodman"
          rightIcon={
            <Link href="/">
              <a>Q</a>
            </Link>
          }
        />
      </div>
    </section>
  );
};

export default Profile;
