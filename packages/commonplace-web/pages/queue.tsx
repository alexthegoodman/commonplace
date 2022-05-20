import type { NextPage } from "next";
import Link from "next/link";
import ContentInformation from "../components/ContentInformation/ContentInformation";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import ImpressionGrid from "../components/ImpressionGrid/ImpressionGrid";
import ImpressionWheel from "../components/ImpressionWheel/ImpressionWheel";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import PrimaryNavigation from "../components/PrimaryNavigation/PrimaryNavigation";

const Profile: NextPage = () => {
  return (
    <section className="queue">
      <div className="queueInner">
        <PrimaryHeader
          leftIcon={<span className="brandname">Co</span>}
          titleComponent={
            <Link href="/interests">
              <a className="pickerButton">Landscape Paintings</a>
            </Link>
          }
          rightIcon={<PrimaryNavigation />}
        />
        <div className="scrollContainer queueScrollContainer">
          <ContentViewer />
          <ContentInformation
            title="Post Title"
            description={`Here is a description regarding
                          the various things that we need to do. Also
                          we can do other things`}
            author={{ name: "Big Gigantic" }}
          />
        </div>
        <ImpressionGrid />
        {/* <ImpressionWheel /> */}
      </div>
    </section>
  );
};

export default Profile;
