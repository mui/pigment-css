import * as React from 'react';

const ColorSchemeContext = React.createContext<{
  colorScheme: string;
  setColorScheme: React.Dispatch<React.SetStateAction<string>>;
}>({
  colorScheme: 'light',
  setColorScheme: () => '',
});

export function ColorSchemeProvider({
  colorScheme: initialColorScheme,
  children,
}: React.PropsWithChildren<{ colorScheme: string }>) {
  const [colorScheme, setColorScheme] = React.useState<string>(initialColorScheme);

  const contextValue = React.useMemo(
    () => ({ colorScheme, setColorScheme }),
    [colorScheme, setColorScheme],
  );

  // Set the colorScheme in localStorage
  React.useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  // Handle when localStorage has changed
  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      const value = event.newValue;
      if (
        typeof event.key === 'string' &&
        event.key === 'colorScheme' &&
        typeof value === 'string'
      ) {
        setColorScheme(value);
      }
    };
    // For syncing color-scheme changes between iframes
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [setColorScheme]);

  return <ColorSchemeContext.Provider value={contextValue}>{children}</ColorSchemeContext.Provider>;
}

export const useColorScheme = () => {
  return React.useContext(ColorSchemeContext);
};
