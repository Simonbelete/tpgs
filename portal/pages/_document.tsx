import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <div
          id="portal"
          style={{ position: "fixed", left: 0, top: 0, zIndex: 9999 }}
        />

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
