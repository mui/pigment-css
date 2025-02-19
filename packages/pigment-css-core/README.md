# Pigment CSS

Pigment CSS is a zero-runtime CSS-in-JS library that extracts the colocated styles to their own CSS files at build time.

## Getting started

Pigment CSS supports Next.js and Vite with support for more bundlers in the future.

### Why choose Pigment CSS

Thanks to recent advancements in CSS (like CSS variables and `color-mix()`), "traditional" CSS-in-JS solutions that process styles at runtime are no longer required for unlocking features like color transformations and theme variables which are necessary for maintaining a sophisticated design system.

Pigment CSS addresses the needs of the modern React developer by providing a zero-runtime CSS-in-JS styling solution as a successor to tools like Emotion and styled-components.

Compared to its predecessors, Pigment CSS offers improved DX and runtime performance (though at the cost of increased build time) while also being compatible with React Server Components.
Pigment CSS is built on top of [WyW-in-JS](https://wyw-in-js.dev/), enabling to provide the smoothest possible experience for Material UI users when migrating from Emotion in v5 to Pigment CSS in v6.

### Installation

<!-- #default-branch-switch -->

```bash
npm install @pigment-css/core
npm install --save-dev @pigment-css/nextjs-plugin
```

<!-- Replace this with the documentation link once it is available. -->

For more information and getting started guide, check the [repository README.md](https://github.com/mui/pigment-css).
