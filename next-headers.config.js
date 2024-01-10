const { createSecureHeaders } = require("next-secure-headers");

//* List of service:
//! please continue to use this ordered list!
//* - google
//* - google maps
//* - google fonts
//* - fresh chat
//* - tag manager
//* - google analytics
//* - google ads
//* - facebook
//* - linkedin
//* - adroll
//* - hotjar
//* - matomo

const cspDirectives = {
  defaultSrc: ["'none'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'",
    "'report-sample'",
    // google maps
    "https://maps.googleapis.com",
    "https://maps.google.com",
    // fresh chat
    "https://wchat.freshchat.com",
    // iubenda
    "https://*.iubenda.com",
    // google tag manager
    "https://www.googletagmanager.com",
    "https://googletagmanager.com",
    "https://tagmanager.google.com",
    // google analytics
    "https://www.google-analytics.com",
    "https://ssl.google-analytics.com",
    "https://google-analytics.com",
    // google ads
    "https://*.doubleclick.net",
    "https://*.googleadservices.com",
    "https://*.google.com",
    "https://*.googlesyndication.com",
    "https://*.googletagservices.com",
    // facebook
    "https://connect.facebook.net",
    "https://graph.facebook.com",
    "https://js.facebook.com",
    // linkedin
    "https://snap.licdn.com",
    "https://static-exp1.licdn.com",
    "https://content.linkedin.com",
    "https://platform.linkedin.com",
    // adroll
    "https://s.adroll.com",
    "https://d.adroll.com",
    // hotjar
    "https://static.hotjar.com",
    "https://script.hotjar.com",
    // matomo
    "https://cdn.matomo.cloud",
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "'report-sample'",
    // google fonts
    "fonts.googleapis.com",
    // fresh chat
    "wchat.freshchat.com",
    // iubenda
    "*.iubenda.com",
    // google tag manager
    "www.googletagmanager.com",
    "tagmanager.google.com",
    // google ads
    "*.google.com",
    // facebook
    "*.facebook.com",
    "connect.facebook.net",
    // linkedin
    "*.licdn.com",
  ],
  imgSrc: [
    "'self'",
    "data:",
    "blob:",
    // google
    "www.google.com",
    "www.google.it",
    // google maps
    "*.googleapis.com",
    "maps.google.com",
    "maps.gstatic.com",
    "www.gstatic.com",
    "*.ggpht.com",
    // google fonts
    "fonts.gstatic.com",
    // iubenda
    "*.iubenda.com",
    // google tag manager
    "www.googletagmanager.com",
    // google analytics
    "www.google-analytics.com",
    "ssl.google-analytics.com",
    "www.google.com",
    "analytics.google.com",
    // google ads
    "*.google.com",
    "*.doubleclick.net",
    "*.googlesyndication.com",
    "www.googleadservices.com",
    // facebook
    "*.facebook.com",
    "*.facebook.net",
    "*.fbcdn.net",
    // linkedin
    "*.linkedin.com",
    "*.licdn.com",
    "p.adsymptotic.com",
    // adroll
    "*.adroll.com",
    // hotjar
    "script.hotjar.com",
  ],
  connectSrc: [
    "'self'",
    "about:", // common
    // google maps
    "maps.googleapis.com",
    "maps.google.com",
    // google fonts
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    // iubenda
    "*.iubenda.com",
    // google tag manager
    "www.googletagmanager.com",
    // google analytics
    "*.google-analytics.com",
    "stats.g.doubleclick.net",
    "ampcid.google.com",
    "analytics.google.com",
    // google ads
    "*.doubleclick.net",
    "*.google.com",
    "*.googlesyndication.com",
    "www.googletagservices.com",
    // facebook
    "*.facebook.com",
    "connect.facebook.net",
    // linkedin
    "*.linkedin.com",
    "*.licdn.com",
    // adroll
    "*.adroll.com",
    // hotjar
    "*.hotjar.com",
    "wss://*.hotjar.com",
    "*.hotjar.io",
    // matomo
    "*.matomo.cloud",
  ],
  fontSrc: [
    "'self'",
    "data:",
    // google fonts
    "fonts.gstatic.com",
    "fonts.googleapis.com",
    // hotjar
    "script.hotjar.com",
  ],
  objectSrc: [
    "'self'",
    // google ads
    "*.googlesyndication.com",
  ],
  mediaSrc: [
    "'self'",
    // google ads
    "dai.google.com",
    // linkedin
    "media.licdn.com",
  ],
  frameSrc: ["*"],
  childSrc: [
    // google tag manager
    "www.googletagmanager.com",
    // google ads
    "blob:",
    "*.google.com",
    "*.doubleclick.net",
    "*.googlesyndication.com",
    // facebook
    "*.facebook.com",
    "connect.facebook.net",
  ],
  formAction: [
    "'self'",
    // google ads
    "*.google.com",
    // facebook
    "*.facebook.com",
    "connect.facebook.net",
  ],
  manifestSrc: [
    "'self'",
    // google ads
    "*.googlesyndication.com",
  ],
  workerSrc: [
    "'self'",
    "blob:",
    // google ads
    "www.google.com",
  ],
  navigateTo: [
    // fresh chat
    "*.freshchat.com",
  ],
  baseURI: ["'self'"],
  frameAncestors: ["'self'"],
  // prefetchSrc commentato perchè deprecato e non più supportato
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/prefetch-src
  //prefetchSrc: ["'self'"],
  // reportURI: process.env.HEADERS_CSP_REPORT_URI,

  //* https://github.com/jagaapple/next-secure-headers#contentsecuritypolicy
  //* https://content-security-policy.com/
  //* https://rapidsec.com/csp-packages/
  //* https://csper.io/blog/an-introduction-to-report-uri
  //* https://github.com/nico3333fr/CSP-useful/blob/master/csp-wtf/explained.md

  // CSP LEVEL 1
  // defaultSrc: string | string[];
  // scriptSrc: string | string[];
  // styleSrc: string | string[];
  // imgSrc: string | string[];
  // connectSrc: string | string[];
  // fontSrc: string | string[];
  // objectSrc: string | string[];
  // mediaSrc: string | string[];
  // frameSrc: string | string[];
  // sandbox:
  //   | true
  //   | "allow-downloads-without-user-activation"
  //   | "allow-forms"
  //   | "allow-modals"
  //   | "allow-orientation-lock"
  //   | "allow-pointer-lock"
  //   | "allow-popups"
  //   | "allow-popups-to-escape-sandbox"
  //   | "allow-presentation"
  //   | "allow-same-origin"
  //   | "allow-scripts"
  //   | "allow-storage-access-by-user-activation"
  //   | "allow-top-navigation"
  //   | "allow-top-navigation-by-user-activation";
  // reportURI: string | URL | (string | URL)[];

  // CSP LEVEL 2
  // childSrc: string | string[];
  // formAction: string | string[];
  // frameAncestors: string | string[];
  // pluginTypes: string | string[];
  // baseURI: string | string[];

  // CSP LEVEL 3
  // reportTo: string;
  // workerSrc: string | string[];
  // manifestSrc: string | string[];
  // prefetchSrc: string | string[];
  // navigateTo: string | string[];

  // reportOnly?: boolean;

  // scriptSrcElem: string | string[];
  // scriptSrcAttr: string | string[];
  // styleSrcElem: string | string[];
  // styleSrcAttr: string | string[];
};

if (process.env.NODE_ENV === "development") {
  // === script-src ===
  // cspDirectives.scriptSrc.push("'unsafe-inline'");
  cspDirectives.scriptSrc.push("'unsafe-eval'");
  // iubenda (http)
  cspDirectives.scriptSrc.push("http://*.iubenda.com");
  // adroll (http)
  cspDirectives.scriptSrc.push("http://s.adroll.com");
}

const secureHeaders = createSecureHeaders({
  forceHTTPSRedirect: false,
  xssProtection: "block-rendering",
  contentSecurityPolicy: {
    directives: cspDirectives,
  },
});

module.exports = {
  headers: () => {
    return [
      {
        source: "/:path*",
        headers: [
          ...secureHeaders,
          {
            // https://github.com/nextauthjs/next-auth/issues/2408
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};
