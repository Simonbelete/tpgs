import { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata";
import Head from "next/head";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: "./",
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.image],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: "summary_large_image",
      images: image ? [image] : [siteMetadata.image],
    },
    ...rest,
  };
}

export const SeoHead = ({
  title,
  description,
  image,
  ...rest
}: PageSEOProps) => {
  return (
    <Head>
      <title>{`${title} | ${siteMetadata.title}`}</title>
      <meta
        name="description"
        content={description || siteMetadata.description}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="theme-color" content="#008a3f" />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/tpsg_platforms_icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/tpsg_platforms_icon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content={siteMetadata.description} />
      <meta name="twitter:url" content={siteMetadata.siteUrl} />
      <meta name="twitter:title" content={`${title} | ${siteMetadata.title}`} />
      <meta name="twitter:description" content={siteMetadata.description} />
      <meta name="twitter:image" content={image ? image : siteMetadata.image} />
      <meta name="twitter:creator" content="@DavidWShadow" />

      <meta property="og:locale" content={siteMetadata.local} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:type" content={"website"} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image ? image : siteMetadata.image} />
      <meta property="og:url" content={"/"} />
    </Head>
  );
};
