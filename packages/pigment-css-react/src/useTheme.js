export default function useTheme() {
  throw new Error(
    `${process.env.PACKAGE_NAME}: You were trying to call "useTheme" function without configuring your bundler. Make sure to install the bundler specific plugin and use it. @pigment-css/vite-plugin for Vite integration or @pigment-css/nextjs-plugin for Next.js integration.`,
  );
}
