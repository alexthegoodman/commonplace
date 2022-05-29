import "../styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <section className="globalContainer">
      <Component {...pageProps} />
    </section>
  );
}

export default MyApp;
