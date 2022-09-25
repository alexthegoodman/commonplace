import { NextPage } from "next";
import * as React from "react";
import AuthForm from "../../components/forms/AuthForm/AuthForm";

// import SignUpForm from "../../../forms/SignUpForm/SignUpForm";
import LandingBlockA from "../../components/landing/LandingBlockA/LandingBlockA";
import LandingFeaturesA from "../../components/landing/LandingFeaturesA/LandingFeaturesA";
import LandingHeroA from "../../components/landing/LandingHeroA/LandingHeroA";

// MailchimpSpaces072019

const Arts: NextPage = () => {
  return (
    <main className="landingContainer">
      <LandingHeroA
        title={
          <strong>
            Get feedback
            <br />
            on your music
          </strong>
        }
        description={
          <p>
            CommonPlace allows artists to upload their music and get reviews for
            free! <br />
            Join a community of artists like yourself by signing up below!
          </p>
        }
        visualUrl="/landing/productMusic.png"
      >
        <AuthForm type="sign-up" />
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

export default Arts;
