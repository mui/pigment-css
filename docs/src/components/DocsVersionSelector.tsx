'use client';
import * as React from 'react';
import * as Menu from '@base_ui/react/Menu';
import { styled } from '@pigment-css/react';
import { SelectIcon } from './icons/Select';

export interface DocumentationVersion {
  version: string;
  url: string;
}

export interface DocsVersionSelectorProps {
  versions: DocumentationVersion[];
  currentVersion: string;
}

const Trigger = styled(Menu.Trigger)(({ theme }) => ({
  all: 'unset',
  position: 'relative',
  lineHeight: 1,
  verticalAlign: 'middle',
  backgroundClip: 'padding-box',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  flexShrink: 0,
  userSelect: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: theme.vars.ff.sans,
  fontWeight: theme.vars.fw[2],
  backgroundColor: 'white',
  borderWidth: '1px',
  borderStyle: 'solid',
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.05),\n    0 2px 4px -1px rgba(0, 0, 0, 0.05),\n    0 4px 8px -2px rgba(0, 0, 0, 0.05)',
  border: '1px solid hsl(0deg 0% 0% / 5%)',
  borderRadius: '6px',
  color: theme.vars.gray.text[2],
  height: theme.vars.space[6],
  paddingLeft: theme.vars.space[2],
  paddingRight: theme.vars.space[5],
  fontSize: theme.vars.fs[2],
  '&:focus-visible': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: 'black',
    outlineOffset: '2px',
  },
  '@media screen and (hover: hover)': {
    '&:hover': { borderColor: 'hsl(0deg 0% 0% / 13%)' },
  },
}));

const Positioner = styled(Menu.Positioner)`
  &:focus-visible {
    outline: none;
  }
`;
const Popup = styled(Menu.Popup)(({ theme }) => ({
  fontFamily: theme.vars.ff.sans,
  fontWeight: theme.vars.fw[2],
  backgroundColor: 'white',
  borderWidth: '1px',
  borderStyle: 'solid',
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.05),\n    0 2px 4px -1px rgba(0, 0, 0, 0.05),\n    0 4px 8px -2px rgba(0, 0, 0, 0.05)',
  border: '1px solid hsl(0deg 0% 0% / 5%)',
  padding: '4px',
  borderRadius: '6px',
  color: theme.vars.gray.text[2],
  fontSize: theme.vars.fs[2],
}));

const Adornment = styled.span`
  top: 0;
  right: 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  position: absolute;
`;

const MenuItem = styled(Menu.Item)`
  display: block;
  text-decoration: none;
  padding: var(--space-2);
  color: inherit;
  border-radius: 3px;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    background-color: hsl(0deg 0% 0% / 5%);
  }
`;

export function DocsVersionSelector(props: DocsVersionSelectorProps) {
  const { versions, currentVersion } = props;

  return (
    <Menu.Root>
      <Trigger aria-label="Select documentation version" disabled={versions.length <= 1}>
        {currentVersion}
        <Adornment>
          <SelectIcon />
        </Adornment>
      </Trigger>
      <Positioner side="bottom" alignment="start" sideOffset={5} positionMethod="fixed">
        <Popup>
          {versions.map((version) => (
            <MenuItem render={<a href={version.url}>{version.version}</a>} key={version.version}>
              {version.version}
            </MenuItem>
          ))}
        </Popup>
      </Positioner>
    </Menu.Root>
  );
}
