// import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import { createPageViewMutation } from "../graphql/mutations/pageview";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
// import * as FullStory from "@fullstory/browser";
// import LogRocket from "logrocket";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { useCookies } from "react-cookie";
import graphClient from "../helpers/GQLClient";

const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === "development";
mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", { debug: isDevelopment });

// LogRocket.init("binhki/commonplace-dev");

// if (isDevelopment) {
//   mixpanel.opt_out_tracking();
// } else {
//   mixpanel.opt_in_tracking();
// }

var tracked = false;
var hotjarInitialized = false;
var pixelInitialized = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [cookies] = useCookies(["coUserToken"]);
  const gqlClient = graphClient.setupClient(cookies["coUserToken"]);

  const createPageView = async () => {
    await graphClient.client.request(createPageViewMutation, {
      url: location.pathname,
    });
  };

  useEffect(() => {
    if (!tracked) {
      tracked = true;
      console.info("createPageView");
      createPageView();
    }
  }, []);

  useEffect(() => {
    const ReactPixel = require("react-facebook-pixel");
    ReactPixel.default.init("606669884534740", {}, { debug: true });
  }, []);

  const initializeFacebookSDK = `
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '1127689154461820',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v14.0'
      });
    };
  `;

  // NOTE: typeof checks for ssr, varIntialized checks once on client
  const initializeHotjar = `
    if (typeof hotjarInitialized === "undefined" || !hotjarInitialized) {
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3162621,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        hotjarInitialized = true;
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
  `;

  // const initializeMetaPixel = `
  //   if (typeof pixelInitialized === "undefined" || !pixelInitialized) {
  //     !function(f,b,e,v,n,t,s)
  //     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  //     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  //     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  //     n.queue=[];t=b.createElement(e);t.async=!0;
  //     t.src=v;s=b.getElementsByTagName(e)[0];
  //     s.parentNode.insertBefore(t,s)}(window, document,'script',
  //     'https://connect.facebook.net/en_US/fbevents.js');
  //     fbq('init', '606669884534740');
  //     fbq('track', 'PageView');
  //     pixelInitialized = true;
  //   }
  // `;

  return (
    <>
      {/* <section className="globalContainer"> */}
      <Head>
        <link rel="stylesheet" href="/globals.min.css" />
        {/** Meta Pixel */}
        {/* <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=606669884534740&ev=PageView&noscript=1"
          />
        </noscript> */}
      </Head>
      {/** TODO: strategy="afterInteractive" ? */}
      <Script dangerouslySetInnerHTML={{ __html: initializeHotjar }} />
      <Script dangerouslySetInnerHTML={{ __html: initializeFacebookSDK }} />
      {/* <Script dangerouslySetInnerHTML={{ __html: initializeMetaPixel }} /> */}
      <Script async defer src="https://connect.facebook.net/en_US/sdk.js" />
      <Component {...pageProps} />
      {/* </section> */}
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
