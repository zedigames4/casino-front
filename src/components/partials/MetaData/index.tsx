import Head from 'next/head';
import React from 'react';

const MetaData = ({ children }: { children: React.ReactNode }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="keywords"
        content="Zeddi, casino, gambling, games, Rwanda, rewards"
      />
      <meta
        name="authors"
        content="Pattern Ndatumuremyi, Celestin Niyindagiriye"
      />
      <meta
        name="description"
        content="Zeddi is a casino in Rwanda where you can play games and earn rewards"
      />
      <meta property="og:site_name" content="Zeddi.com" />
      <meta property="og:url" content="https://www.zeddi.com" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Zeddi | Casino, Earn money via playing games"
      />
      <meta
        property="og:description"
        content="Zeddi is a casino in Rwanda where you can play games and earn rewards"
      />
      <meta property="og:image" content="/android-chrome-512x512.png" />
      <meta property="og:locale" content="en" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:title"
        content="Zeddi | Casino, Earn money via playing games"
      />
      <meta
        property="twitter:description"
        content="Zeddi is a casino in Rwanda where you can play games and earn rewards"
      />
      <meta property="twitter:creator" content="@zeddicom" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Zeddi" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="google" content="notranslate" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="msapplication-TileColor" content="#00003E" />
      <meta name="theme-color" content="#00003E" />

      {children}
    </Head>
  );
};

export default MetaData;
