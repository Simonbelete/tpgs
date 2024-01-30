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
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-591F0GY996');
          `}
      </Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-591F0GY996"
      ></Script>
    </Html>
  );
}
