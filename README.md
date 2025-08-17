<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/blog/introducing-pigment-css/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://master--material-ui.netlify.app/static/pigment-css/pigment-css-logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://master--material-ui.netlify.app/static/pigment-css/pigment-css-logo-light.svg">
      <img alt="Pigment CSS" src="https://master--material-ui.netlify.app/static/pigment-css/pigment-css-logo-light.svg" width="324" height="57">
    </picture>
  </a>
</p>

<p align="center">
Pigment CSS is a zero-runtime CSS-in-JS library that extracts the colocated styles to their own CSS files at build time.
</p>

<div align="center">

Check out Olivier Tassinari introducing Pigment CSS at React Conf 2024:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=0ckOUBiuxVY&t=21677s" target="_blank"><img src="https://img.youtube.com/vi/0ckOUBiuxVY/0.jpg" alt="Introduction of Pigment CSS during React Conf 2024" style="width: 50%; height: 50%; aspect-ratio: 16/9;" /></a>

</div>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui/pigment-css/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@pigment-css/react/latest.svg)](https://www.npmjs.com/package/@pigment-css/react)
[![npm downloads](https://img.shields.io/npm/dm/@pigment-css/react.svg)](https://www.npmjs.com/package/@pigment-css/react)
[![GitHub branch status](https://img.shields.io/github/checks-status/mui/pigment-css/HEAD)](https://app.codecov.io/gh/mui/pigment-css/tree/master)
[![Coverage Status](https://img.shields.io/codecov/c/github/mui/pigment-css.svg)](https://app.codecov.io/gh/mui/pigment-css/)
[![Follow on X](https://img.shields.io/twitter/follow/PigmentCSS.svg?label=follow+Pigment+CSS)](https://x.com/PigmentCSS)
[![Renovate status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://github.com/mui/pigment-css/issues/2)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/mui/pigment-css.svg)](https://isitmaintained.com/project/mui/pigment-css 'Average time to resolve an issue')
[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/mui-org)](https://opencollective.com/mui-org)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9161/badge)](https://www.bestpractices.dev/projects/9161)

</div>

---

# Documentation

- [Getting started](#getting-started)
  - [Why choose Pigment CSS](#why-choose-pigmentcss)
  - [Start with Next.js](#start-with-nextjs)
  - [Start with Vite](#start-with-vite)
- [Basic usage](#basic-usage)
  - [Creating styles](#creating-styles)
  - [Creating components](#creating-components)
    - [Styling based on props](#styling-based-on-props)
    - [Styling based on runtime values](#styling-based-on-runtime-values)
    - [Styled component as a CSS selector](#styled-component-as-a-css-selector)
    - [Media and Container queries](#media-and-container-queries)
    - [Typing props](#typing-props)
  - [Creating animation keyframes](#creating-animation-keyframes)
  - [Creating global styles](#creating-global-styles)
- [Theming](#theming)
  - [Accessing theme values](#accessing-theme-values)
  - [CSS variables support](#css-variables-support)
  - [Adding a prefix to CSS variables](#adding-a-prefix-to-css-variables)
  - [Color schemes](#color-schemes)
  - [Switching color schemes](#switching-color-schemes)
  - [Styling based on color scheme](#styling-based-on-color-scheme)
  - [TypeScript](#typescript)
- [sx prop](#sx-prop)
- [Right-to-left support](#right-to-left-support)
- [How-to guides](#how-to-guides)
  - [Coming from Emotion or styled-components](#coming-from-emotion-or-styled-components)
- [Building reusable components for UI libraries](#building-reusable-components-for-ui-libraries)
- [How Pigment CSS works](#how-pigmentcss-works)

## Getting started

Pigment CSS supports Next.js and Vite with support for more bundlers in the future.
You must install the corresponding plugin, as shown below.

### Why choose Pigment CSS

Thanks to recent advancements in CSS (like CSS variables and `color-mix()`), "traditional" CSS-in-JS solutions that process styles at runtime are no longer required for unlocking features like color transformations and theme variables which are necessary for maintaining a sophisticated design system.

Pigment CSS addresses the needs of the modern React developer by providing a zero-runtime CSS-in-JS styling solution as a successor to tools like Emotion and styled-components.

Compared to its predecessors, Pigment CSS offers improved DX and runtime performance (though at the cost of increased build time) while also being compatible with React Server Components.
Pigment CSS is built on top of [WyW-in-JS](https://wyw-in-js.dev/), enabling to provide the smoothest possible experience for Material UI users when migrating from Emotion in v5 to Pigment CSS in v6.

### Start with Next.js

#### Quickstart

Use the following commands to quickly create a new Next.js project with Pigment CSS set up:

```bash
curl https://codeload.github.com/mui/pigment-css/tar.gz/master | tar -xz --strip=2  pigment-css-master/examples/pigment-css-nextjs-ts
cd pigment-css-nextjs-ts
```

#### Manual installation

```bash
npm install @pigment-css/react
npm install --save-dev @pigment-css/nextjs-plugin
```

Then, in your `next.config.js` file, import the plugin and wrap the exported config object:

```js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment({
  // ... Your nextjs config.
});
```

Finally, import the stylesheet in the root `layout.tsx` file:

```diff
 import type { Metadata } from 'next';
+import '@pigment-css/react/styles.css';

 export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
 };

 export default function RootLayout(props: { children: React.ReactNode }) {
   return (
     <html lang="en">
       <body>{props.children}</body>
     </html>
   );
 }
```

### Start with Vite

#### Quickstart

Use the following commands to quickly create a new Vite project with Pigment CSS set up:

```bash
curl https://codeload.github.com/mui/pigment-css/tar.gz/master | tar -xz --strip=2 pigment-css-master/examples/pigment-css-vite-ts
cd pigment-css-vite-ts
```

#### Manual installation

```bash
npm install @pigment-css/react
npm install --save-dev @pigment-css/vite-plugin
```

Then, in your Vite config file, import the plugin and pass it to the `plugins` array as shown:

```js
import { pigment } from '@pigment-css/vite-plugin';

export default defineConfig({
  plugins: [
    pigment(),
    // ... Your other plugins.
  ],
});
```

Finally, import the stylesheet in the root `main.tsx` file:

```diff
 import * as React from 'react';
 import { createRoot } from 'react-dom/client';
+import '@pigment-css/react/styles.css';
 import App from './App';

 const rootElement = document.getElementById('root');
 const root = createRoot(rootElement);

 root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>,
 );
```

## Basic usage

**You must configure Pigment CSS with [Next.js](#nextjs) or [Vite](#vite) first.**

### Creating styles

Use the `css` API to create reusable styles:

```js
import { css } from '@pigment-css/react';

const visuallyHidden = css({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
});

function App() {
  return <div className={visuallyHidden}>I am invisible</div>;
}
```

The call to the `css` function is replaced with a unique string that represents the CSS class name for the generated styles.

Use a callback function to get access to the [theme](#theming) values:

```js
const title = css(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

### Creating components

Use the `styled` API to create a component by passing styles at the end. The usage should be familiar if you've worked with Emotion or styled-components:

```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: '4rem',
  fontWeight: 'bold',
  padding: '10px 0px',
});

function App() {
  return <Heading>Hello</Heading>;
}
```

Pigment CSS differs from "standard" runtime CSS-in-JS libraries in a few ways:

1. You never get direct access to props in your styled declarations. This is because prop values are only available at runtime, but the CSS is extracted at build time. See [Styling based on runtime values](#styling-based-on-runtime-values) for a workaround.
2. Your styles must be declarative and must account for all combinations of props that you want to style.
3. The theme lets you declare CSS tokens that become part of the CSS bundle after the build. Any other values and methods that it might have are only available during build time—not at runtime. This leads to smaller bundle sizes.

#### Styling based on props

> 💡 This approach is recommended when the value of the prop is known at build time (finite values).

Use the `variants` key to define styles for a combination of the component's props.

Each variant is an object with `props` and `style` keys. The styles are applied when the component's props match the `props` object.

**Example 1** — A button component with `small` and `large` sizes:

```tsx
interface ButtonProps {
  size?: 'small' | 'large';
}

const Button = styled('button')<ButtonProps>({
  border: 'none',
  padding: '0.75rem',
  // ...other styles
  variants: [
    {
      props: { size: 'large' },
      style: { padding: '1rem' },
    },
    {
      props: { size: 'small' },
      style: { padding: '0.5rem' },
    },
  ],
});

<Button>Normal button</Button>; // padding: 0.75rem
<Button size="large">Large button</Button>; // padding: 1rem
<Button size="small">Small button</Button>; // padding: 0.5rem
```

**Example 2** — A button component with variants and colors:

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: [
    {
      props: { variant: 'contained', color: 'primary' },
      style: { backgroundColor: 'tomato', color: 'white' },
    },
  ],
});

// `backgroundColor: 'tomato', color: 'white'`
<Button variant="contained" color="primary">
  Submit
</Button>;
```

**Example 3** — Apply styles based on a condition:

The value of the `props` can be a function that returns a boolean. If the function returns `true`, the styles are applied.

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: [
    {
      props: (props) => props.variant !== 'contained',
      style: { backgroundColor: 'transparent' },
    },
  ],
});
```

Note that the `props` function doesn't work if it is inside another closure, for example, inside an `array.map`:

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: ['red', 'blue', 'green'].map((item) => ({
    props: (props) => {
      // ❌ Cannot access `item` in this closure
      return props.color === item && !props.disabled;
    },
    style: { backgroundColor: 'tomato' },
  })),
});
```

Instead, use plain objects to define the variants:

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: ['red', 'blue', 'green'].map((item) => ({
    props: { color: item, disabled: false },
    style: { backgroundColor: 'tomato' },
  })),
});
```

#### Styling based on runtime values

> 💡 This approach is recommended when the value of a prop is **unknown** ahead of time or possibly unlimited values, for example styling based on the user's input.

There are two ways to achieve this (both involve using a CSS variable):

1. Declare a CSS variable directly in the styles and set its value using inline styles:

   ```jsx
   const Heading = styled('h1')({
     color: 'var(--color)',
   });

   function Heading() {
     const [color, setColor] = React.useState('red');

     return <Heading style={{ '--color': color }} />;
   }
   ```

2. Use a callback function as a value to create a dynamic style for the specific CSS property:

   ```jsx
   const Heading = styled('h1')({
     color: ({ isError }) => (isError ? 'red' : 'black'),
   });
   ```

   Pigment CSS replaces the callback with a CSS variable and injects the value through inline styles. This makes it possible to create a static CSS file while still allowing dynamic styles.

   ```css
   .Heading_class_akjsdfb {
     color: var(--Heading_class_akjsdfb-0);
   }
   ```

   ```jsx
   <h1
     style={{
       '--Heading_class_akjsdfb-0': isError ? 'red' : 'black',
     }}
   >
     Hello
   </h1>
   ```

#### Styled component as a CSS selector

All of the components that you create are also available as CSS selectors. For example, for the `Heading` component described in the previous section, you can target that component inside another styled component like this:

```jsx
const Wrapper = styled.div({
  [`& ${Heading}`]: {
    color: 'blue',
  },
});
```

This enables you to override the default `color` of the Heading component rendered inside the Wrapper:

```tsx
<Wrapper>
  <Heading>Hello</Heading>
</Wrapper>
```

You can also export any styled component you create and use it as the base for additional components:

```jsx
const ExtraHeading = styled(Heading)({
  // ... overridden styled
});
```

#### Media and Container queries

Pigment CSS APIs have built-in support for writing media queries and container queries. Use the `@media` and `@container` keys to define styles for different screen and container sizes.

```jsx
import { css, styled } from '@pigment-css/react';

const styles = css({
  fontSize: '2rem',
  '@media (min-width: 768px)': {
    fontSize: '3rem',
  },
  '@container (max-width: 768px)': {
    fontSize: '1.5rem',
  },
});

const Heading = styled('h1')({
  fontSize: '2rem',
  '@media (min-width: 768px)': {
    fontSize: '3rem',
  },
  '@container (max-width: 768px)': {
    fontSize: '1.5rem',
  },
});
```

> 💡 **Good to know**:
>
> Pigment CSS uses Emotion behind the scenes for turning tagged templates and objects into CSS strings.

#### Typing props

If you use TypeScript, add the props typing before the styles to get the type checking:

```tsx
const Heading = styled('h1')<{ isError?: boolean }>({
  color: ({ isError }) => (isError ? 'red' : 'black'),
});
```

### Creating animation keyframes

Use the `keyframes` API to create reusable [animation keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes):

```js
import { keyframes } from '@pigment-css/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function Example1() {
  return <div style={{ animation: `${fadeIn} 0.5s` }}>I am invisible</div>;
}
```

The call to the `keyframes` function is replaced with a unique string that represents the CSS animation name. It can be used with `css` or `styled` too.

```js
import { css, styled, keyframes } from '@pigment-css/react';

const fadeIn = keyframes(...);

const Example2 = styled('div')({
  animation: `${fadeIn} 0.5s`,
});

function App() {
  return (
    <>
      <Example1 />
      <div
        className={css`
          animation: ${fadeIn} 0.5s;
        `}
      />
    </>
  )
}
```

### Creating global styles

Use the `globalCss` API to create global styles:

```js
import { globalCss } from '@pigment-css/react';

globalCss`
  body {
    margin: 0;
    padding: 0;
  }
`;
```

The `globalCss` function should to be called at the top level of your JavaScript file, usually from the entry point of the application.

Calling inside a function or a component will not work as expected. Also, the extraction of global styles will always take place regardless of conditional rendering.

## Theming

Theming is an **optional** feature that lets you reuse the same values, such as colors, spacing, and typography, across your application. It is a plain object of any structure that you can define in your config file.

> **💡 Good to know**:
>
> The **theme** object is used at build time and does not exist in the final JavaScript bundle. This means that components created using Pigment CSS's `styled` can be used with React Server Components by default while still getting the benefits of theming.

For example, in Next.js, you can define a theme in the `next.config.js` file like this:

```js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment(
  {
    // ...other nextConfig
  },
  {
    theme: {
      colors: {
        primary: 'tomato',
        secondary: 'cyan',
      },
      spacing: {
        unit: 8,
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
      // ...more keys and values, it's free style!
    },
  },
);
```

### Accessing theme values

A callback can be used with **styled()** and **css()** APIs to access the theme values:

```js
const Heading = styled('h1')(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

### CSS variables support

Pigment CSS can generate CSS variables from the theme values when you wrap your theme with `extendTheme` utility. For example, in a `next.config.mjs` file:

```js
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

export default withPigment(
  {
    // ...nextConfig
  },
  {
    theme: extendTheme({
      colors: {
        primary: 'tomato',
        secondary: 'cyan',
      },
      spacing: {
        unit: 8,
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
    }),
  },
);
```

The `extendTheme` utility goes through the theme and creates a `vars` object which represents the tokens that refer to CSS variables.

```jsx
const theme = extendTheme({
  colors: {
    primary: 'tomato',
    secondary: 'cyan',
  },
});

console.log(theme.colors.primary); // 'tomato'
console.log(theme.vars.colors.primary); // 'var(--colors-primary)'
```

### Adding a prefix to CSS variables

You can add a prefix to the generated CSS variables by providing a `cssVarPrefix` option to the `extendTheme` utility:

```jsx
extendTheme({
  cssVarPrefix: 'pigment',
});
```

The generated CSS variables have the `pigment` prefix:

```css
:root {
  --pigment-colors-background: #f9f9f9;
  --pigment-colors-foreground: #121212;
}
```

### Color schemes

Some tokens, especially color-related tokens, can have different values for different scenarios. For example in a daylight condition, the background color might be white, but in a dark condition, it might be black.

The `extendTheme` utility lets you define a theme with a special `colorSchemes` key:

```jsx
extendTheme({
  colorSchemes: {
    light: {
      colors: {
        background: '#f9f9f9',
        foreground: '#121212',
      },
    },
    dark: {
      colors: {
        background: '#212121',
        foreground: '#fff',
      },
    },
  },
});
```

In the above example, `light` (default) and `dark` color schemes are defined. The structure of each color scheme must be a plain object with keys and values.

### Switching color schemes

By default, when `colorSchemes` is defined, Pigment CSS uses the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query to switch between color schemes based on the user's system settings.

However, if you want to control the color scheme based on application logic, for example, using a button to switch between light and dark mode, you can customize the behavior by providing a `getSelector` function:

```diff
 extendTheme({
   colorSchemes: {
     light: { ... },
     dark: { ... },
   },
+  getSelector: (colorScheme) => colorScheme ? `.theme-${colorScheme}` : ':root',
 });
```

Note that you need to add the logic to a button by yourself. Here is an example of how to do it:

```jsx
function App() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle('theme-dark');
      }}
    >
      Toggle color scheme
    </button>
  );
}
```

### Styling based on color scheme

The `extendTheme` utility attaches a function called `applyStyles` to the theme object. It receives a color scheme as the first argument followed by a style object.
It returns a proper CSS selector based on the theme configuration.

```jsx
const Heading = styled('h1')(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
  ...theme.applyStyles('dark', {
    color: theme.colors.primaryLight,
  }),
}));
```

### TypeScript

To get the type checking for the theme, you need to augment the theme type:

```ts
// any file that is included in your tsconfig.json
import type { ExtendTheme } from '@pigment-css/react/theme';

declare module '@pigment-css/react/theme' {
  interface ThemeTokens {
    // the structure of your theme
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: 'light' | 'dark';
      tokens: ThemeTokens;
    }>;
  }
}
```

## sx prop

A special `sx` prop lets you apply styles directly to an element. When `sx` prop is specified on an element, Pigment CSS will replace it with `className` and `style` props at build time.

The `sx` prop works on any element, including HTML elements and 3rd-party custom components as long as it is JSX.

### Usage

```js
<div sx={{ display: 'flex', flexDirection: 'column' }}>
```

For a React component like the example below, it must pass the `className` and `style` props to the underlying DOM element, otherwise the styles won't be applied.

```js
// /path/to/AnyComponent.js
const AnyComponent = (props) => {
  return <div {...props} />;
};

// /path/to/App.js
<AnyComponent sx={{ fontSize: 12, color: 'red' }} />;
```

The value provided to `sx` prop can be one of the following:

- a plain style object (recommended for best performance)
- a callback function that receives the [theme object](#theming) then return a plain style object:

  ```js
  <div sx={(theme) => ({ color: theme.colors.primary })} />
  ```

- an array of plain style objects or callback functions. This is useful for applying conditional styles based on other variables:

  ```js
  <div
    sx={[
      { color: 'red' },
      selected && { fontWeight: 'bold' },
      disabled ? (theme) => ({ opacity: theme.state.disabledOpacity }) : { opacity: 1 },
    ]}
  />
  ```

### TypeScript

To use `sx` prop on HTML element, you need to augment the `HTMLAttributes` interface. Add the following code to a file that is included in your tsconfig.json:

```ts
type Theme = {
  // your theme type
};

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: Theme) => React.CSSProperties)
        | ReadonlyArray<React.CSSProperties | ((theme: Theme) => React.CSSProperties)>;
    }
  }
}
```

## Right-to-left support

To support right-to-left (RTL) languages, add the `dir="rtl"` attribute to your app's `<html>` element or any other equivalent top level container. Then, update your bundler config as follows to generate styles for both directions:

### Next.js

```js
import { withPigment } from '@pigment-css/nextjs-plugin';

// ...
export default withPigment(nextConfig, {
  theme: yourCustomTheme,
  // CSS output option
  css: {
    // Specify your default CSS authoring direction
    defaultDirection: 'ltr',
    // Generate CSS for the opposite of the `defaultDirection`
    // This is set to `false` by default
    generateForBothDir: true,
  },
});
```

### Vite

```js
import { pigment } from '@pigment-css/vite-plugin';

export default defineConfig({
  plugins: [
    pigment({
      theme: yourTheme,
      css: {
        // Specify your default CSS authoring direction
        defaultDirection: 'ltr',
        // Generate CSS for the opposite of the `defaultDirection`
        // This is set to `false` by default
        generateForBothDir: true,
      },
    }),
    // ... other plugins.
  ],
});
```

### Generated CSS

For example, if you've specified `defaultDirection: 'ltr'` and `dir="rtl"`, and your authored CSS looks like this:

```js
import { css } from '@pigment-css/react';

const className = css`
  margin-left: 10px,
  margin-right: 20px,
  padding: '0 10px 20px 30px'
`;
```

Then the actual CSS output would be:

```css
.cmip3v5 {
  margin-left: 10px;
  margin-right: 20px;
  padding: 0 10px 20px 30px;
}

[dir='rtl'] .cmip3v5 {
  margin-right: 10px;
  margin-left: 20px;
  padding: 0 30px 20px 10px;
}
```

### Custom dir selector

The default selector in the output CSS is `[dir=rtl]` or `[dir=ltr]`. You can customize it by passing an optional `getDirSelector` method to the `css` property in your bundler config:

```js
    css: {
      getDirSelector(dir: string) {
        // return a custom selector you'd like to use
        return `:dir(${dir})`;
      },
    },
```

## How-to guides

### Coming from Emotion or styled-components

Emotion and styled-components are runtime CSS-in-JS libraries. What you write in your styles is what you get in the final bundle, which means the styles can be as dynamic as you want with bundle size and performance overhead trade-offs.

On the other hand, Pigment CSS extracts CSS at build time and replaces the JavaScript code with hashed class names and some CSS variables. This means that it has to know all of the styles to be extracted ahead of time, so there are rules and limitations that you need to be aware of when using JavaScript callbacks or variables in Pigment CSS's APIs.

Here are some common patterns and how to achieve them with Pigment CSS:

#### 1. Fixed set of styles

In Emotion or styled-components, you can use props to create styles conditionally:

```js
const Flex = styled('div')((props) => ({
  display: 'flex',
  ...(props.vertical // ❌ Pigment CSS will throw an error
    ? {
        flexDirection: 'column',
        paddingBlock: '1rem',
      }
    : {
        paddingInline: '1rem',
      }),
}));
```

But in Pigment CSS, you need to define all of the styles ahead of time using the `variants` key:

```js
const Flex = styled('div')((props) => ({
  display: 'flex',
  variants: [
    {
      props: { vertical: true },
      style: {
        flexDirection: 'column',
        paddingBlock: '1rem',
      },
    },
    {
      props: { vertical: false },
      style: {
        paddingInline: '1rem',
      },
    },
  ],
}));
```

> 💡 Keep in mind that the `variants` key is for fixed values of props, for example, a component's colors, sizes, and states.

#### 2. Programatically generated styles

For Emotion and styled-components, the styles are different on each render and instance because the styles are generated at runtime:

```js
function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateBubbleVars() {
  return `
    --x: ${randomBetween(10, 90)}%;
    --y: ${randomBetween(15, 85)}%;
  `;
}

function App() {
  return (
    <div>
      {[...Array(10)].map((_, index) => (
        <div key={index} className={css`${generateBubbleVars()}`} />
      ))}
    </div>
  )
}
```

However, in Pigment CSS with the same code as above, all instances have the same styles and won't change between renders because the styles are extracted at build time.

To achieve the same result, you need to move the dynamic logic to props and pass the value to CSS variables instead:

```js
function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Bubble = styled('div')({
  '--x': props => props.x,
  '--y': props => props.y,
});

function App() {
  return (
    <div>
      {[...Array(10)].map((_, index) => (
        <Bubble key={index} x={`${randomBetween(10, 90)}%`} y={`${randomBetween(15, 85)}%`} />
      ))}
    </div>
  )
}
```

## Building reusable components for UI libraries

The purpose of this guide is to demonstrate how to create reusable components for a UI library that can be shared across multiple projects and used to implement different design systems through custom theming.
The approach outlined here is not necessary when constructing components to be consumed and themed in a single project.
It's most relevant for developers who want to build a component library that could be published as a package to be consumed and themed by other developers.

The steps below will walk you through how to create a statistics component that could serve as part of a reusable UI library built with Pigment CSS.
This process has three parts:

1. [Create component slots](#1-create-component-slots).
2. [Compose slots to create the component](#2-create-the-component).
3. [Style slots based on props](#3-style-slots-based-on-props).

### 1. Create component slots

Slots let the consumers customize each individual element of the component by targeting its respective name in the [theme's styleOverrides](#themeable-statistics-component).

This statistics component is composed of three slots:

- `root`: the container of the component
- `value`: the number to be displayed
- `unit`: the unit or description of the value

> 💡 Though you can give these slots any names you prefer, we recommend using `root` for the outermost container element for consistency with the rest of the library.

Use the `styled` API with `name` and `slot` parameters to create the slots, as shown below:

```js
// /path/to/Stat.js
import * as React from 'react';
import { styled } from '@pigment-css/react';

const StatRoot = styled('div', {
  name: 'PigmentStat', // The component name
  slot: 'root', // The slot name
})({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0.75rem 1rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  letterSpacing: '-0.025em',
  fontWeight: 600,
});

const StatValue = styled('div', {
  name: 'PigmentStat',
  slot: 'value',
})({
  font: '1.2rem "Fira Sans", sans-serif',
});

const StatUnit = styled('div', {
  name: 'PigmentStat',
  slot: 'unit',
})({
  font: '0.875rem "Fira Sans", sans-serif',
  color: '#121212',
});
```

### 2. Create the component

Assemble the component using the slots created in the previous step:

```js
// /path/to/Stat.js
import * as React from 'react';

// ...slot styled-components

const Stat = React.forwardRef(function Stat(props, ref) {
  const { value, unit, ...other } = props;

  return (
    <StatRoot ref={ref} {...other}>
      <StatValue>{value}</StatValue>
      <StatUnit>{unit}</StatUnit>
    </StatRoot>
  );
});

export default Stat;
```

### 3. Style slots based on props

In this example, a prop named `variant` is defined to let consumers change the appearance of the `Stat` component.

Pass down the `variant` prop to `<StatRoot>` to style the `root` slot, as shown below:

```diff
 const Stat = React.forwardRef(function Stat(props, ref) {
+  const { value, unit, variant, ...other } = props;

   return (
-     <StatRoot ref={ref} {...other}>
-       <StatValue>{value}</StatValue>
-       <StatUnit>{unit}</StatUnit>
-     </StatRoot>
+     <StatRoot ref={ref} variant={variant} {...other}>
+       <StatValue>{value}</StatValue>
+       <StatUnit>{unit}</StatUnit>
+     </StatRoot>
   );
 });
```

Then you can use Pigment CSS variants API to style it when `variant` prop has a value of `outlined`:

```diff
 const StatRoot = styled('div', {
   name: 'PigmentStat',
   slot: 'root',
 })({
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   padding: '0.75rem 1rem',
   backgroundColor: '#f9f9f9',
   borderRadius: '8px',
   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   letterSpacing: '-0.025em',
   fontWeight: 600,
+  variants: [
+    {
+      props: { variant: 'outlined' },
+      style: {
+        border: `2px solid #e9e9e9`,
+      },
+    },
+  ],
 });
```

This completes the reusable statistics component.
If this were a real UI library, the component would be ready to upload to a package registry so others could use it.

### Consumer usage

Developers using your component must first install your package as well as the Pigment CSS packages that correspond to the [framework](#start-with-nextjs) they're using.

```bash
npm install your-package-name @pigment-css/react
npm install -D @pigment-css/nextjs-plugin
```

Next, they must set up Pigment CSS in their project:

```js
// framework config file, for example next.config.js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment(
  {
    // ... Your nextjs config.
  },
  { transformLibraries: ['your-package-name'] },
);
```

Finally, they must import the stylesheet in the root layout file:

```js
// index.tsx
import '@pigment-css/react/styles.css';
```

Then they can use your component in their project:

```jsx
import Stat from 'your-package-name/Stat';

function App() {
  return <Stat value={42} unit="km/h" variant="outlined" />;
}
```

### Consumer theming

Developers can customize the component's styles using the theme's `styleOverrides` key and the component name and slots you defined in [step 2](#2-create-the-component).
For example, the custom theme below sets the background color of the statistics component's root slot to `tomato`:

```js
export default withPigment(
  { ...nextConfig },
  {
    theme: {
      components: {
        PigmentStat: {
          styleOverrides: {
            root: {
              backgroundColor: 'tomato',
            },
            value: {
              color: 'white',
            },
            unit: {
              color: 'white',
            },
          },
        },
      },
    },
  },
);
```

Developers can also access theme values and apply styles based on the component's props using the `variants` key:

```js
export default withPigment(
  { ...nextConfig },
  {
    theme: {
      // user defined colors
      colors: {
        primary: 'tomato',
        primaryLight: 'lightcoral',
      },
      components: {
        PigmentStat: {
          styleOverrides: {
            root: ({ theme }) => ({
              backgroundColor: 'tomato',
              variants: [
                {
                  props: { variant: 'outlined' },
                  style: {
                    border: `2px solid ${theme.colors.primary}`,
                    backgroundColor: theme.colors.primaryLight,
                  },
                },
              ],
            }),
            value: {
              color: 'white',
            },
            unit: {
              color: 'white',
            },
          },
        },
      },
    },
  },
);
```

## How Pigment CSS works

See [How Pigment CSS works](HOW_PIGMENT_CSS_WORKS.md) for details on the build process.
