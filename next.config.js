const basePath =
  process.env.GITHUB_PAGES === 'true' ? '/CraftiProp-Website' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
