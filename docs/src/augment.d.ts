import type { SxProp } from '@pigment-css/react';
import { Theme } from './theme';

declare module '@pigment-css/react/theme' {
  export interface ThemeArgs {
    theme: Theme & {
      vars: Theme;
    };
  }
}

declare module 'react' {
  interface Attributes {
    sx?: SxProp | undefined;
  }
}
