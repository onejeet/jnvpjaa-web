import createCache from '@emotion/cache';
import { documentGetInitialProps, DocumentHeadTags } from '@mui/material-nextjs/v14-pagesRouter';
import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const MyDocument = (props: any) => (
  <Html>
    <Head>
      <DocumentHeadTags {...props} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
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

MyDocument.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createCache({ key: 'mui' }),
  });

  return finalProps;
};

export default MyDocument;
