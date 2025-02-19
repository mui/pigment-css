import type { Theme as UserTheme } from './theme';

declare module '@pigment-css/theme' {
  export interface Theme extends UserTheme {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LIB_VERSION: string;
      APP_NAME: string;
      GITHUB: string;
      NPM: string;
    }
  }
}
