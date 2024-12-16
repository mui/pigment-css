const BUNDLER_MESSAGE =
  'Make sure to install the bundler specific plugin and use it. @pigment-css/vite-plugin for Vite integration or @pigment-css/nextjs-plugin for Next.js integration.';

export function generateErrorMessage(fnName: string) {
  return `${process.env.PACKAGE_NAME}: You were trying to call "${fnName}" function without configuring your bundler. ${BUNDLER_MESSAGE}`;
}
