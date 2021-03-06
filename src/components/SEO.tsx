import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExludeTitleSufflix?: boolean; 
  shouldIndexPage?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  shouldExludeTitleSufflix,
  shouldIndexPage = true
}:SEOProps ){

  const pageTitle = `${title} ${!shouldExludeTitleSufflix ? '| DevCommerce' : ''}`;
  const pageImage = image ? `${process.env.NEXT_PUBLIC_SITE_URL}/${image}` : null;


  return (
    <Head>
      <title>{pageTitle}</title>
      { description && <meta name="description" content={description} />}
      { pageImage && <meta name="image" content={pageImage} />}
      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
}