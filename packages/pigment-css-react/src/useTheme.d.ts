import { ThemeArgs } from './theme';

export default function useTheme(): ThemeArgs extends { theme: any } ? ThemeArgs['theme'] : any;
