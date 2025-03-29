import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add font preloads here if using custom fonts */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
