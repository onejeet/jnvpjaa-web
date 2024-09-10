import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const MyDocument = () => (
  <Html>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="emotion-insertion-point" content="" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
