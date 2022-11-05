import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Utilities from "commonplace-utilities/lib";
import { cpDomain } from "commonplace-utilities/lib/def/urls";
import LandingBlockA from "../components/landing/LandingBlockA/LandingBlockA";
import LandingFeaturesA from "../components/landing/LandingFeaturesA/LandingFeaturesA";
import LandingHeroA from "../components/landing/LandingHeroA/LandingHeroA";

const Home: NextPage = () => {
  const canonicalUrl = "https://" + cpDomain;

  return (
    <main className="landingContainer">
      <NextSeo
        title={`CommonPlace | Welcome`}
        description={`Get free feedback and connect over all hobbies on CommonPlace`}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: `Find friends and their hobbies on CommonPlace`,
          description: "CommonPlace has posts from people like yourself",
          images: [{ url: "/ogImage1.jpg" }],
          site_name: "CommonPlace",
        }}
      />
      <LandingHeroA
        title={<strong>Get feedback on what you do</strong>}
        description={
          <p>
            CommonPlace enables creators and hobbyists to learn what others
            think, for free! Join today by signing up below:
          </p>
        }
        visualUrl="/landing/productArtEnglish.png"
      >
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
        headline="Gather honest opinions"
        description={
          <>
            <p>
              CommonPlace is simple. Review to upload. If you review 3 posts,
              you can upload your own. Everything from music and research papers
              to poems and calligraphy.
            </p>
            <p>There's an option for anything you do or create.</p>
          </>
        }
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
      <LandingBlockA
        headline="Grow your audience"
        description={
          <p>
            Connect with the others who review your work and grow your audience
            online. Network with like minded people and open the door to new
            opportunities.
          </p>
        }
      />
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
