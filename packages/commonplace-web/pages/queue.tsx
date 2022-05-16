import type { NextPage } from "next";
import Link from "next/link";
import ContentInformation from "../components/ContentInformation/ContentInformation";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import ImpressionWheel from "../components/ImpressionWheel/ImpressionWheel";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const Profile: NextPage = () => {
  return (
    <section className="queue">
      <div className="queueInner">
        <PrimaryHeader
          leftIcon={
            <Link href="/profile">
              <a>P</a>
            </Link>
          }
          titleComponent={<h1>Landscape Paintings</h1>}
          rightIcon={
            <Link href="/updates">
              <a>U</a>
            </Link>
          }
        />
        <div className="scrollContainer">
          <ContentViewer />
          <ContentInformation
            title="Post Title"
            author={{ name: "Big Gigantic" }}
          />
        </div>
        <ImpressionWheel />
      </div>
    </section>
  );
};

export default Profile;
