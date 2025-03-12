# Pigment CSS Docs

This is a Next.js based app that uses the app router and exports a static build that is hosted on Netlify.

It uses Pigment CSS itself for all the styling. The Pigment CSS config in the `next.config.ts` file includes an `include` filter to only transform files ending in `pigment.ts` or `pigment.tsx`. So any `styled` or `css` call should be done in a file ending with the same extension. Rest of the files won't go through Pigment CSS's transform making it comparatively faster than trying to transform all the files, even if they don't contain anything related to Pigment CSS.

`pigment.tsx` has also been added to the `pageExtensions` option in the Next.js config so that we can write our layout/page files directly and that'll be part of Next.js routes.

All the navigation items in the left sidebar of the docs is part of [src/nav.ts](./src/nav.ts) file. This also decides the pages that'll be generated during build.

## Adding a new page

To add a new mdx page, identify the correct category (directory) in the [content](./src/content/) directory and create a new mdx file. Make sure to add an appropriate navigation item in [src/nav.ts](./src/nav.ts) at the desired place. The sidebar should be updated now with the new item. Navigate to the new page.

Any navigation item or parent category can be marked as `draft` by setting `draft: true`. This makes sure that the marked nav items and the corresponding pages are only rendered during development and won't be part of the final production build.
