import type {} from '@pigment-css/react/theme';
import type { ExtendTheme } from '@pigment-css/react';

declare module '@pigment-css/react/theme' {
  export interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: 'light' | 'dark';
      tokens: {
        palette: {
          background: string;
          foreground: string;
          primary: string;
          primaryForeground: string;
          border: string;
        };
      };
    }>;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes {
      sx?: SxProps<Theme>;
    }
    interface SVGProps {
      sx?: SxProps<Theme>;
    }
  }
}
