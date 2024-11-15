import * as React from 'react';
import { styled } from '@pigment-css/react';
import packageJson from '../../../package.json';
import { IconLinkButton } from './IconLinkButton';
import { IconButton } from './IconButton';
import { DocsVersionSelector } from './DocsVersionSelector';
import { PigmentIcon } from './icons/Pigment';
import { GitHubIcon } from './icons/Github';
import { SettingsIcon } from './icons/Settings';

const currentVersion = packageJson.version;
const supportedVersions = [
  {
    version: currentVersion,
    url: '#',
  },
];

const Header = styled.header(({ theme }) => ({
  boxSizing: 'border-box',
  position: 'fixed',
  top: '0px',
  width: '100%',
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backgroundClip: 'padding-box',
  backdropFilter: 'blur(4.25px) saturate(125%)',
  padding: `${theme.vars.space[1]} ${theme.vars.space[3]}`,
  borderBottom: `1px solid ${theme.vars.gray.outline[1]}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export function AppBar() {
  return (
    <Header>
      <div
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: theme.vars.space[2],
        })}
      >
        <IconLinkButton useNextLink href="/" label="Pigment CSS" size={3}>
          <PigmentIcon />
        </IconLinkButton>
        {supportedVersions.length > 1 && (
          <DocsVersionSelector currentVersion={currentVersion} versions={supportedVersions} />
        )}
      </div>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconLinkButton
          href={process.env.REPO_ROOT}
          target="_blank"
          label="GitHub"
          rel="noreferrer noopener"
          size={3}
        >
          <GitHubIcon />
        </IconLinkButton>
        <IconButton label="settings" size={3}>
          <SettingsIcon />
        </IconButton>
      </div>
    </Header>
  );
}
