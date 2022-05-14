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
          leftIcon={<></>}
          titleComponent={<h1>Landscape Paintings</h1>}
          rightIcon={<></>}
        />
        <ContentViewer />
        <ContentInformation
          title="Post Title"
          author={{ name: "Big Gigantic" }}
        />
        <ImpressionWheel />
      </div>
    </section>
  );
};

export default Home;
