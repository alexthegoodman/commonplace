// import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
// import * as FullStory from "@fullstory/browser";
// import LogRocket from "logrocket";

const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === "development";
mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", { debug: isDevelopment });

// LogRocket.init("binhki/commonplace-dev");

// if (isDevelopment) {
//   mixpanel.opt_out_tracking();
// } else {
//   mixpanel.opt_in_tracking();
// }

function MyApp({ Component, pageProps }: AppProps) {
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

  const initializeHotjar = `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3162621,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;

  return (
    <>
      {/* <section className="globalContainer"> */}
      <Head>
        <link rel="stylesheet" href="/globals.min.css" />
      </Head>
      <Script dangerouslySetInnerHTML={{ __html: initializeHotjar }} />
      <Script dangerouslySetInnerHTML={{ __html: initializeFacebookSDK }} />
      <Script async defer src="https://connect.facebook.net/en_US/sdk.js" />
      <Component {...pageProps} />
      {/* </section> */}
    </>
  );
}

export default MyApp;
