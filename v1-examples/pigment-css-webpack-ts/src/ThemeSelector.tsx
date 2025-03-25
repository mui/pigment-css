import * as React from 'react';

type Mode = 'light' | 'dark' | 'system';

export function ThemeSelector() {
  const [mode, setMode] = React.useState<Mode | null>(
    window.localStorage.getItem('mode') as Mode | null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as Mode;
    if (!newMode) {
      return;
    }
    setMode(newMode);
    window.localStorage.setItem('mode', newMode);
    document.documentElement.dataset.theme = newMode;
  };

  return (
    <select name="mode" aria-label="Select theme" value={mode ?? ''} onChange={handleChange}>
      <option value="" disabled>
        Select Theme
      </option>
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
