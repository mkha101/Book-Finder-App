require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

const nextConfig = {
  distDir: "build", //this line will tell the build to create a file with this name
};

module.exports = nextConfig;
