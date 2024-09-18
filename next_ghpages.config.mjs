// Deploying to a GH pages site requires setting the basePath option
// (and potentially the assetPrefix option as well), this can't
// be set via CLI so instead we use a separate next.config.mjs file
// that we use during the GitHub action that builds the pages
import createMDX from '@next/mdx'


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ace3tool",
  assetPrefix: "https://sydney-informatics-hub.github.io/ace3tool",
  trailingSlash: true,
  images: {unoptimized: true},
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
