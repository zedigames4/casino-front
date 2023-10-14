/* eslint-disable react/no-danger */
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html
      lang="en"
      dir="ltr"
      data-react-helmet="lang"
      data-version="vv1.0.0"
      data-commit="2bacd"
      translate="no"
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#00003E" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
      </body>
    </Html>
  );
};

export default Document;
