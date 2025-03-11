import type { Theme as UserTheme } from './theme';

declare module '@pigment-css/react-new' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends UserTheme {}
}
