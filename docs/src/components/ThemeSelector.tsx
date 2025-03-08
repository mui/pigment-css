'use client';

import * as React from 'react';
import { MonitorCog, SunMediumIcon, MoonIcon } from 'lucide-react';

import { GhostButton } from './GhostButton';

type Mode = 'light' | 'dark' | 'system' | null;

const LS_KEY = 'mode';

const MODE_FLOW: Record<
  Exclude<Mode, null>,
  {
    next: Exclude<Mode, null>;
    title: string;
    icon: typeof SunMediumIcon;
  }
> = {
  light: {
    next: 'dark',
    title: 'Switch to dark mode',
    icon: SunMediumIcon,
  },
  dark: {
    next: 'system',
    title: 'Switch to system mode',
    icon: MoonIcon,
  },
  system: {
    next: 'light',
    title: 'Switch to light mode',
    icon: MonitorCog,
  },
};

export function ThemeSelector() {
  const [mode, setMode] = React.useState<Mode>(null);
  const {
    title,
    icon: Icon,
    next: nextMode,
  } = React.useMemo(() => MODE_FLOW[mode ?? 'system'], [mode]);

  React.useLayoutEffect(() => {
    setMode((window.localStorage.getItem(LS_KEY) as Mode) ?? 'system');
  }, []);

  const handleModeChange = React.useCallback(() => {
    setMode(nextMode);
    if (nextMode === 'system') {
      window.localStorage.removeItem(LS_KEY);
    } else {
      window.localStorage.setItem(LS_KEY, nextMode);
    }
    document.documentElement.dataset.theme = nextMode;
  }, [nextMode]);

  return (
    <GhostButton title={title} aria-label={title} onClick={handleModeChange}>
      {mode ? <Icon size={16} color="var(--color-foreground)" /> : null}
    </GhostButton>
  );
}
