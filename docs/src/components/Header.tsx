import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { NpmIcon } from 'docs/icons/NpmIcon';
import { GitHubIcon } from 'docs/icons/GitHubIcon';
import { filteredNav } from 'docs/nav';
import {
  headerButton,
  headerLink,
  HeaderLinkContainer,
  Inner,
  logoLink,
  MobileNavContainer,
  NavIcon,
  NpmPackage,
  NpmPackageVersionText,
  Root,
} from './Header.pigment';
import * as MobileNav from './MobileNav';
import { navItem, navLink } from './MobileNav.pigment';

const ThemeSelector = dynamic(() => import('./ThemeSelector'));

export function Header() {
  return (
    <Root>
      <Inner>
        <NextLink href="/" className={`${logoLink}`}>
          <Image alt={process.env.APP_NAME} src="/static/logo.svg" width={17} height={28} />
        </NextLink>

        <HeaderLinkContainer>
          <ThemeSelector />
          <a className={`${headerLink}`} href={process.env.NPM} rel="noopener">
            <NpmIcon />
            {process.env.LIB_VERSION}
          </a>
          <a className={`${headerLink}`} href={process.env.GITHUB} rel="noopener">
            <GitHubIcon />
            GitHub
          </a>
        </HeaderLinkContainer>

        <MobileNavContainer>
          <MobileNav.Root>
            <MobileNav.Trigger className={`${headerLink} ${headerButton}`}>
              <NavIcon className="flex w-4 flex-col items-center gap-1">
                <div className="navIconBar" />
                <div className="navIconBar" />
              </NavIcon>
              Navigation
            </MobileNav.Trigger>
            <MobileNav.Portal>
              <MobileNav.Backdrop />
              <MobileNav.Popup>
                {filteredNav.map((section) => (
                  <MobileNav.Section key={section.label}>
                    <MobileNav.Heading>{section.label}</MobileNav.Heading>
                    <MobileNav.List>
                      {section.links.map((link) => (
                        <MobileNav.Item key={link.href} href={link.href}>
                          {link.label}
                        </MobileNav.Item>
                      ))}
                    </MobileNav.List>
                  </MobileNav.Section>
                ))}

                <MobileNav.Section>
                  <MobileNav.Heading>Resources</MobileNav.Heading>
                  <MobileNav.List>
                    <MobileNav.Item href={process.env.NPM} rel="noopener">
                      <NpmIcon />
                      <NpmPackage>
                        npm package
                        <NpmPackageVersionText>{process.env.LIB_VERSION}</NpmPackageVersionText>
                      </NpmPackage>
                    </MobileNav.Item>
                    <MobileNav.Item href={process.env.GITHUB} rel="noopener">
                      <GitHubIcon className="mt-[-2px]" />
                      GitHub
                    </MobileNav.Item>
                  </MobileNav.List>
                </MobileNav.Section>

                <MobileNav.Section>
                  <MobileNav.Heading>Site settings</MobileNav.Heading>
                  <MobileNav.List>
                    <li className={`${navItem}`}>
                      <span className={`${navLink}`}>
                        <ThemeSelector showLabel />
                      </span>
                    </li>
                  </MobileNav.List>
                </MobileNav.Section>
              </MobileNav.Popup>
            </MobileNav.Portal>
          </MobileNav.Root>
        </MobileNavContainer>
      </Inner>
    </Root>
  );
}
