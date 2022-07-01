import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === "development";
mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", { debug: isDevelopment });

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

  return (
    <section className="globalContainer">
      <Script dangerouslySetInnerHTML={{ __html: initializeFacebookSDK }} />
      <Script async defer src="https://connect.facebook.net/en_US/sdk.js" />
      <Component {...pageProps} />
    </section>
  );
}

export default MyApp;
