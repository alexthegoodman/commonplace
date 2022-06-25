import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

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
