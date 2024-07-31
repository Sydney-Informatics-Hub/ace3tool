import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({enabled: process.env.ANALYZE === 'true'});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/informatics/PIPE-5195-dementia-risk",
};

export default withBundleAnalyzer(nextConfig);
