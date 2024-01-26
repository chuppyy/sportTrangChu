import { Suspense } from "react";
import { GetServerSideProps } from "next";
import Script from "next/script";
import axios from "axios";
import Head from "next/head";
const formatDate = (str: string) => {
  const date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
import { useEffect } from 'react';
export default function Page(data: any) {
  const article = data.data;
     useEffect(() => {
    try {
       ((window as any).adsbygoogle = (window as any)?.adsbygoogle || [])?.push({});
    } catch (err) {
      console.log('err2222');
    }
  }, []);
  return (
    <>
      <Head>
        <title>{article.name}</title>
        <meta property="og:image" content={article.avatarLink} />
        <meta property="og:title" content={article.name} />
      </Head>
      <Script id="gg-1" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-Y23MD9WKC2`} />
      <Script id="gg-2" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y23MD9WKC2');
        `}
      </Script>
      <Script
  id="adsbygoogle-init"
  strategy="afterInteractive"
  crossOrigin="anonymous"
  src= "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8079422152195086"/>
      <main>
        <Script src="/qcscript.js" />
        <div className="container-flu details">
 <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8079422152195086"
          crossOrigin="anonymous"
        ></script>
       <ins
      className="adsbygoogle"    
     style={{ display: 'block' }}
     data-ad-client="ca-pub-8079422152195086"
     data-ad-slot="6695725073"
     data-ad-format="auto"
     data-full-width-responsive="true"
    />
        
       

          <h1>{article.name}</h1>
         
                  <div id="M936537ScriptRootC1576310"></div>
          <script
                      src="https://jsc.adskeeper.com/s/p/sportnews.thongtinluat.com.1576310.js"
            async
          ></script>
          <p className="mb-4 text-lg">
            Posted: {formatDate(article.dateTimeStart)}
          </p>
          <Suspense fallback={<p>Loading ...</p>}>
            <article
              className="content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Suspense>
        </div>
              <div id="M936537ScriptRootC1576309"></div>
        <script
                  src="https://jsc.adskeeper.com/s/p/sportnews.thongtinluat.com.1576309.js"
          async
        ></script>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async ({
  params,
}) => {
    try {
        
    const response = await axios.get(
        `${process.env.APP_API}/News/news-detail?id=${params?.slug?.slice(params?.slug?.lastIndexOf("-") + 1) }`
    );
    return {
      props: { data: response.data.data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: [] as any[] }, // Sử dụng any type cho data
    };
  }
};
