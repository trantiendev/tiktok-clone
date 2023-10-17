/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.pixabay.com',
      'p16-amd-va.tiktokcdn.com',
      'image.shutterstock.com',
      'scontent.fsgn5-13.fna.fbcdn.net',
      'assets2.rockpapershotgun.com',
    ],
  },
}

module.exports = nextConfig
