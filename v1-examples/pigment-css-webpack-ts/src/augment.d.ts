import type { Theme as UserTheme } from './theme';

declare module '@pigment-css/react-new' {
  export interface Theme extends UserTheme {}
}
