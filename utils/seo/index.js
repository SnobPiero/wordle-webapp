const headTags = ({
  robotIndex = true,
  robotFollow = true,
  title = null,
  description = null,
  keywords = [],
  subject = null,
}) => {
  let head_tags = [
    // standard tags
    <meta charSet="utf-8" key={"charset"} />,
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" key={"viewport"} />,

    // Set the document's title
    title && <title key={"title"}>{title}</title>,

    // Name of web application (only should be used if the website is used as an app)
    <meta name="application-name" content="Wordle" key={"application-name"} />,

    // Theme Color for Chrome, Firefox OS and Opera
    <meta name="theme-color" content="#ffffff" key={"theme-color"} />,

    // Short description of the document (limit to 150 characters)
    // This content *may* be used as a part of search engine results.
    description && <meta name="description" content={description} key={"description"} />,
  ];

  // Keywords for indexing website page
  if (typeof keywords === "string") {
    head_tags = [...head_tags, <meta name="keywords" content={keywords} key={"keywords"} />];
  } else {
    if (keywords?.length > 0) {
      head_tags = [...head_tags, <meta name="keywords" content={keywords.join(", ")} key={"keywords"} />];
    }
  }

  // Enable SEO if IS production
  if (process.env.NEXT_PUBLIC_SEO_META_ROBOTS === "1") {
    // User-logged pages or page where indexing IS NOT needed
    const robotContent = [robotIndex ? "index" : "noindex", robotFollow ? "follow" : "nofollow"];
    head_tags = [
      ...head_tags,
      // Control the behavior of search engine crawling and indexing
      <meta name="robots" content={robotContent.join(",")} key={"robots"} />, // All Search Engines
      <meta name="googlebot" content={robotContent.join(",")} key={"googlebot"} />, // Google Specific
      <meta name="bingbot" content={robotContent.join(",")} key={"bingbot"} />, // Bing Specific
      <meta name="slurp" content={robotContent.join(",")} key={"slurp"} />, // Yahoo Specific
    ];
  }

  // Block SEO if NOT production
  if (process.env.NEXT_PUBLIC_SEO_META_ROBOTS === "0") {
    head_tags = [
      ...head_tags,
      // Control the behavior of search engine crawling and indexing
      <meta name="robots" content="noindex, nofollow" key={"robots"} />, // All Search Engines
      <meta name="googlebot" content="noindex, nofollow" key={"googlebot"} />, // Google Specific
      <meta name="bingbot" content="noindex, nofollow" key={"bingbot"} />, // Bing Specific
      <meta name="slurp" content="noindex, nofollow" key={"slurp"} />, // Yahoo Specific
    ];
  }

  head_tags = [
    ...head_tags,
    // Tells Google not to show the sitelinks search box
    <meta name="google" content="nositelinkssearchbox" key={"google-sitelink"} />,

    // Tells Google not to provide a translation for this document
    <meta name="google" content="notranslate" key={"google-notranslate"} />,
  ];

  // Enable validation only if IS production
  if (process.env.NEXT_PUBLIC_SEO_SITE_VERIFICATION === "production") {
    head_tags = [
      ...head_tags,
      // Verify website ownership
      <meta name="google-site-verification" content="verification_token" key={"google_token"} />, // Google Search Console
      // <meta name="yandex-verification" content="verification_token" key={'yandex_token'} />, // Yandex Webmasters
      <meta name="msvalidate.01" content="verification_token" key={"bing_token"} />, // Bing Webmaster Center
      // <meta name="alexaVerifyID" content="verification_token" key={'alexa_token'} />, // Alexa Console
      // <meta name="p:domain_verify" content="code_from_pinterest" key={'pinterest_token'} />, // Pinterest Console
      // <meta name="norton-safeweb-site-verification" content="norton_code" key={'norton_token'} />, // Norton Safe Web
    ];
  }

  head_tags = [
    ...head_tags,
    // Short description of your document's subject
    subject && <meta name="subject" content={subject} key={"subject"} />,

    // Disable automatic detection and formatting of possible phone numbers
    <meta name="format-detection" content="telephone=no" key={"format-detection"} />,

    // Links to information about the author(s) of the document
    // <link rel="author" href="humans.txt" key={'author'} />,

    // Icons
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key={"apple-touch-icon"} />,
    <link rel="icon" type="image/ico" sizes="32x32" href="/favicon.ico" key={"icon-32"} />,
    <link rel="icon" type="image/ico" sizes="16x16" href="/favicon.ico" key={"icon-16"} />,

    // Links to a JSON file that specifies "installation" credentials for the web applications
    <link rel="manifest" href="/site.webmanifest" key={"webmanifest"} />,

    // Safari Touchbar icon
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#21334f" key={"mask-icons"} />,

    // Microsoft Tile
    <meta name="msapplication-TileColor" content="#2b5797" key={"ms-tile"} />,

    // Facebook (da capire se serve)
    <meta property="fb:app_id" content="123456789" key={"fb-app-id"} />,

    // Pinterest
    <meta name="pinterest" content="nopin" key={"pinterest-noip"} />,
  ];

  if (robotIndex) {
    head_tags = [
      ...head_tags,

      // automatico, deve essere tutto l'url complete
      <meta property="og:url" content="https://example.com/page.html" key={"og-url"} />,

      // fisso website
      <meta property="og:type" content="website" key={"og-type"} />,

      // identico al meta title
      title && <meta property="og:title" content={title} key={"og-title"} />,

      // se sono su un prodotto, vedo immagine del prodotto
      // su index e categoria, vedo immagine standard
      <meta property="og:image" content="https://example.com/image.jpg" key={"og-image"} />,

      // se sono su un prodotto, vedo label dell'immagine del prodotto
      <meta property="og:image:alt" content="A description of what is in the image (not a caption)" key={"og-image-alt"} />,

      // identico alla meta description
      description && <meta property="og:description" content={description} key={"og-description"} />,

      // fisso
      title && <meta property="og:site_name" content={title} key={"og-site-name"} />,

      // IT
      <meta property="og:locale" content="it_IT" key={"og-locale"} />,

      // Non serve
      // <meta property="article:author" content="" key={'article-author'} />,

      // Twitter
      // Sospesi
      <meta name="twitter:card" content="summary" key={"twitter-card"} />,
      // <meta name="twitter:site" content="@site_account" key={'twitter-site'} />,
      // <meta name="twitter:creator" content="@individual_account" key={'twitter-creator'} />,
      // <meta name="twitter:url" content="https://example.com/page.html" key={'twitter-url'} />,

      // identico al meta title
      title && <meta name="twitter:title" content={title} key={"twitter-title"} />,

      // identico alla meta description
      description && <meta name="twitter:description" content={description} key={"twitter-description"} />,

      // se sono su un prodotto, vedo immagine del prodotto
      // su index e categoria, vedo immagine standard
      <meta name="twitter:image" content="https://example.com/image.jpg" key={"twitter-image"} />,

      // se sono su un prodotto, vedo label dell'immagine del prodotto
      <meta
        name="twitter:image:alt"
        content="A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters."
        key={"twitter-image-alt"}
      />,

      // disallow Twitter from using your site's info for personalization purposes
      // <meta name="twitter:dnt" content="on" key={'twitter-dnt'} />,
    ];
  }

  return head_tags;
};

export { headTags };
