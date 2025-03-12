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
      WEBSITE: string;
      CONTENT_DIR: string;
      CHANGELOG_FILE: string;
      DEPLOY_ENV: string;
    }
  }
}
