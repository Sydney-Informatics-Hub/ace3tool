import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from '@next/mdx'

const withBundleAnalyzer = bundleAnalyzer({enabled: process.env.ANALYZE === 'true'});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {unoptimized: true},
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(withBundleAnalyzer(nextConfig));
