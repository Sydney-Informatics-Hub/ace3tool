import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from '@next/mdx'

const withBundleAnalyzer = bundleAnalyzer({enabled: process.env.ANALYZE === 'true'});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ace3tool",
  assetPrefix: "https://sydney-informatics-hub.github.io/ace3tool/",
  trailingSlash: true,
  images: {unoptimized: true},
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(withBundleAnalyzer(nextConfig));
