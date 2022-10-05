import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";
import AuthForm from "../../components/forms/AuthForm/AuthForm";

// import SignUpForm from "../../../forms/SignUpForm/SignUpForm";
import LandingBlockA from "../../components/landing/LandingBlockA/LandingBlockA";
import LandingFeaturesA from "../../components/landing/LandingFeaturesA/LandingFeaturesA";
import LandingHeroA from "../../components/landing/LandingHeroA/LandingHeroA";
import nextI18nextConfig from "../../next-i18next.config";

// MailchimpSpaces072019

const Arts: NextPage = () => {
  return (
    <main className="landingContainer">
      <LandingHeroA
        title={<strong>আপনার শিল্প প্রতিক্রিয়া পান</strong>}
        description={
          <p>
            CommonPlace শিল্পীদের তাদের সৃষ্টি আপলোড করতে এবং বিনামূল্যে
            পর্যালোচনা পেতে অনুমতি দেয়! নীচে সাইন আপ করে লোকেরা কী ভাবে তা
            খুঁজে বের করুন!
          </p>
        }
        visualUrl="/landing/productArtBengali.png"
      >
        <AuthForm type="sign-up" defaultLng="bn" />
      </LandingHeroA>
      <LandingFeaturesA
        headline="সৎ মতামত সংগ্রহ করুন"
        description={
          <>
            <p>
              কমনপ্লেস সহজ। আপলোড করার জন্য পর্যালোচনা করুন। আপনি 3টি পোস্ট
              পর্যালোচনা করলে, আপনি নিজের আপলোড করতে পারেন৷
            </p>
          </>
        }
        features={[
          {
            image: "/landing/mailchimp2-small.jpg",
            headline: "3টি পোস্ট পর্যালোচনা করুন",
            description:
              "শুধু আপনার জন্য সবচেয়ে প্রাসঙ্গিক পোস্টগুলি খুঁজুন এবং সেগুলি পর্যালোচনা করা শুরু করুন৷",
          },
          {
            image: "/landing/mailchimp3-small.jpg",
            headline: "আপনার নিজের আপলোড",
            description:
              "একবার আপনি পর্যাপ্ত পয়েন্ট অর্জন করলে, আপনি আপনার নিজের ছবি, ভিডিও, ছবি বা পাঠ্য আপলোড করতে পারবেন।",
          },
          {
            image: "/landing/mailchimp4-small.jpg",
            headline: "আপনি কোথায় দাঁড়িয়ে আছেন তা জানুন",
            description:
              "সঙ্গীত এবং গবেষণাপত্র থেকে পেইন্টিং এবং কবিতা সব বিষয়ে প্রতিক্রিয়া পান।",
          },
        ]}
      />
      <LandingBlockA
        headline="আপনার শ্রোতা বাড়ান"
        description={
          <p>
            অন্যদের সাথে সংযোগ করুন যারা আপনার কাজ পর্যালোচনা করে এবং অনলাইনে
            আপনার দর্শক বাড়ায়। সমমনা মানুষদের সাথে নেটওয়ার্ক করুন এবং নতুন
            সুযোগের দরজা খুলে দিন।
          </p>
        }
      />
    </main>
  );
};

export async function getServerSideProps(context) {
  const locale = "bn";

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["auth", "settings", "common"],
        nextI18nextConfig
      )),
    },
  };
}

export default Arts;
