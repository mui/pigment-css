'use client';

import * as React from 'react';
import { MonitorCog, SunMediumIcon, MoonIcon } from 'lucide-react';

import { SelectMenu } from './SelectMenu';

type Mode = 'light' | 'dark' | 'system' | null;

const LS_KEY = 'mode';

const MODE_FLOW: Record<
  Exclude<Mode, null>,
  {
    label: string;
    icon: typeof SunMediumIcon;
  }
> = {
  light: {
    label: 'Light mode',
    icon: SunMediumIcon,
  },
  dark: {
    label: 'Dark mode',
    icon: MoonIcon,
  },
  system: {
    label: 'System mode',
    icon: MonitorCog,
  },
};

const OPTIONS: { value: Mode; label: string }[] = Object.entries(MODE_FLOW).map(([key, value]) => ({
  value: key as Mode,
  label: value.label,
}));

export default function ThemeSelector({ showLabel = false }: { showLabel?: boolean }) {
  const [mode, setMode] = React.useState<Mode>(null);
  const { icon: Icon } = React.useMemo(() => MODE_FLOW[mode ?? 'system'], [mode]);

  React.useLayoutEffect(() => {
    setMode((window.localStorage.getItem(LS_KEY) as Mode) ?? 'system');
  }, []);

  const handleModeChange = React.useCallback((nextMode: Mode) => {
    setMode(nextMode);
    if (nextMode === 'system') {
      window.localStorage.removeItem(LS_KEY);
    } else if (nextMode) {
      window.localStorage.setItem(LS_KEY, nextMode);
    }
    document.documentElement.dataset.theme = nextMode ?? 'system';
  }, []);

  return (
    <SelectMenu
      label="Select theme"
      options={OPTIONS}
      value={mode}
      onChange={handleModeChange}
      openOnHover
    >
      {mode ? <Icon size={16} color="var(--color-foreground)" /> : null}
      {showLabel && <span>Select Theme</span>}
    </SelectMenu>
  );
}
