import { ThemeArgs } from './theme';

export default function useTheme(): ThemeArgs extends { theme: unknown } ? ThemeArgs['theme'] : any;
