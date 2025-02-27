const BUNDLER_MESSAGE = `Make sure to install the Pigment CSS plugin package and configure it.
@pigment-css/plugin/vite for Vite integration, or
@pigment-css/plugin/nextjs for Next.js integration, or
@pigment-css/plugin/webpack for Webpack integration`;

export function generateErrorMessage(fnName: string, packageName = process.env.PACKAGE_NAME) {
  return `${packageName}: You were trying to call "${fnName}" function without configuring your bundler. ${BUNDLER_MESSAGE}`;
}
