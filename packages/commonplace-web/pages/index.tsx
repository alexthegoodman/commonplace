import type { NextPage } from "next";
import ContentInformation from "../components/ContentInformation/ContentInformation";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import ImpressionWheel from "../components/ImpressionWheel/ImpressionWheel";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const Home: NextPage = () => {
  return (
    <section className="queue">
      <div className="queueInner">
        <PrimaryHeader
          leftIcon={<>x</>}
          titleComponent={<h1>Landscape Paintings</h1>}
          rightIcon={<>x</>}
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

export default Home;
