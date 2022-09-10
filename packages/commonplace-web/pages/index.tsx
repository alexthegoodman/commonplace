import type { NextPage } from "next";
import Utilities from "../../commonplace-utilities";
import LandingBlockA from "../components/landing/LandingBlockA/LandingBlockA";
import LandingFeaturesA from "../components/landing/LandingFeaturesA/LandingFeaturesA";
import LandingHeroA from "../components/landing/LandingHeroA/LandingHeroA";

const Home: NextPage = () => {
  return (
    <main className="landingContainer">
      <LandingHeroA visualUrl="/landing/mailchimp1-small.jpg">
        <>
          <a href="/sign-up" className="button">
            Sign Up
          </a>
          <a href="/sign-in" className="button">
            Sign In
          </a>
        </>
      </LandingHeroA>
      <LandingFeaturesA
        features={[
          {
            image: "/landing/mailchimp2-small.jpg",
            headline: "Review 3 posts",
            description:
              "Simply find the posts that are most relevant to you and begin reviewing them.",
          },
          {
            image: "/landing/mailchimp3-small.jpg",
            headline: "Upload your own",
            description:
              "Once you have earned enough points, you're free to upload your own image, video, image, or text.",
          },
          {
            image: "/landing/mailchimp4-small.jpg",
            headline: "Know where you stand",
            description:
              "Get feedback on everything from music and research papers to paintings and poems.",
          },
        ]}
      />
      <LandingBlockA />
    </main>
  );
};

export async function getServerSideProps(context) {
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const token = cookieData.coUserToken;

  if (token) {
    return {
      redirect: {
        destination: "/queue",
        permanent: false,
      },
    };
  }

  return {
    props: {
      // fallback: {
      //   profileKey: null,
      // },
    },
  };
}

export default Home;
