const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.BUNBLE_ANALYZER === "1",
});

const { headers } = require("./next-headers.config");

// https://github.com/vercel/next.js/blob/canary/packages/next/server/config-shared.ts#L68

module.exports = () => {
  const config = {
    output: "standalone",
    swcMinify: true,
    compress: false,
    poweredByHeader: false,
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    images: {
      domains: [],
    },
  };

  if (process.env.HEADERS_ENABLED === "1") {
    config.headers = headers;
  }

  return withBundleAnalyzer(config);
};
