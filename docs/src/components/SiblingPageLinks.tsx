import * as React from 'react';
import Link from 'next/link';
import { css, styled } from '@pigment-css/react';
import { type RouteMetadata } from '../../data/pages';
import { ChevronRightIcon } from './icons/ChevronRight';

export interface SiblingPageLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  currentSlug: string;
  pages: readonly RouteMetadata[];
}

const Root = styled('div', {
  shouldForwardProp(propName) {
    return propName !== 'direction';
  },
})<{ direction?: 'left' | 'right' }>(({ theme }) => ({
  paddingBottom: theme.vars.space[9],
  justifyContent: 'space-between',
  gap: theme.vars.space[3],
  display: 'flex',
  alignItems: 'center',
  variants: [
    {
      props: {
        direction: 'left',
      },
      style: {
        justifyContent: 'start',
      },
    },
    {
      props: {
        direction: 'right',
      },
      style: {
        justifyContent: 'end',
      },
    },
  ],
}));

const link = css(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${theme.vars.space[2]} ${theme.vars.space[3]}`,
  gap: theme.vars.space[2],
  borderRadius: 5,
  '@media screen and (hover: hover)': {
    '&:hover': {
      backgroundColor: theme.vars.gray.container[1],
    },
  },
}));

export function SiblingPageLinks(props: SiblingPageLinksProps) {
  const { currentSlug, className, pages, ...other } = props;

  const flattenedPages = flattenSitepmap(pages);
  const currentIndex = flattenedPages.findIndex((page) => page.pathname === currentSlug);

  const previousPage = flattenedPages[currentIndex - 1];
  const nextPage = flattenedPages[currentIndex + 1];

  let direction: 'left' | 'right' | undefined;
  if (previousPage && !nextPage) {
    direction = 'left';
  }
  if (nextPage && !previousPage) {
    direction = 'right';
  }

  return (
    <Root {...other} direction={direction} className={className}>
      {previousPage && (
        <Link href={previousPage.pathname} className={link}>
          <ChevronRightIcon sx={{ transform: 'rotate(180deg)' }} />
          {previousPage.title}
        </Link>
      )}
      {nextPage && (
        <Link href={nextPage.pathname} className={link}>
          {nextPage.title}
          <ChevronRightIcon />
        </Link>
      )}
    </Root>
  );
}

function flattenSitepmap(pages: readonly RouteMetadata[]): RouteMetadata[] {
  const flatPages: RouteMetadata[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const page of pages) {
    if (!page.children) {
      flatPages.push(page);
    } else {
      flatPages.push(...flattenSitepmap(page.children));
    }
  }

  return flatPages;
}
