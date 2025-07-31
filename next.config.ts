/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
// import "./src/env.js";

// /** @type {import("next").NextConfig} */
// const config = {};

// export default config;
// next.config.js
import "./src/env.js";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: false,
  swSrc: "src/service-worker/sw.ts", // ✅ this is what gets compiled into public/sw.js
})(config);
