import { Suspense } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
type Props = {
  params: { slug: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const id = slug.slice(slug.lastIndexOf("-") + 1);
  const { data: article } = await fetch(
    "https://api.sportsandtravelonline.com/News/news-detail?id=" + id
  ).then((res) => res.json());

  return {
    title: article.name,
    metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
    openGraph: {
      images: [article.avatarLink],
    },
  };
}

async function getData(slug: string) {
  try {
    const idHash = slug.slice(slug.lastIndexOf("-") + 1);
    const { data: article } = await fetch(
      "https://api.sportsandtravelonline.com/News/news-detail?id=" + idHash
    ).then((res) => res.json());
    return article;
  } catch (error) {
    console.log(error);
  }
}

const formatDate = (str: string) => {
  const date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default async function Page({ params }: Props) {
  const article: any = await getData(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
        <Script src="/qcscript.js" />
  <div className="min-h-screen mx-auto max-w-2xl p-4">
    <div id="M918883ScriptRootC1537797"></div>
    <script src="https://jsc.mgid.com/v/b/vbonews.com.1537797.js" async></Script>
    

    <h1 className="mx-auto text-3xl md:text-6xl lg:text-6xl font-bold tracking-tighter leading-normal mb-4">
      {article.name}
    </h1>
    <p className="mb-4 text-lg">
      Posted: {formatDate(article.dateTimeStart)}
    </p>
    <Suspense fallback={<p>Loading ...</p>}>
      <article
        className="mx-auto content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </Suspense>
  </div>
  {/* // <!-- Composite Start --> */}
  <div id="M932897ScriptRootC1569677"></div>
<Script src="https://jsc.mgid.com/l/o/lovenews.sportsandtravelonline.com.1569677.js" async></Script>
  {/* // <!-- Composite End --> */}
    </main>
  );
}
