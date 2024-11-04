import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { type RouteMetadata } from '@data/pages';
import { css, styled } from '@pigment-css/react';
import classes from './SiblingPageLinks.module.css';

export interface SiblingPageLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  currentSlug: string;
  pages: readonly RouteMetadata[];
}

const Root = styled.div`
  padding-bottom: var(--space-9);
  justify-content: center;
  gap: var(--space-3);
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  width: 1px;
  height: 16px;
  background-color: var(--gray-outline-2);
  flex-shrink: 0;
`;

const link = {
  root: css`
    all: unset;
    line-height: 1;
    vertical-align: middle;
    background-clip: padding-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
    user-select: none;
    display: flex;
    padding: var(--space-3);
    border-radius: 6px;
    align-items: center;
    font-family: var(--ff-sans);
    font-size: var(--fs-3);
    cursor: pointer;
    color: var(--gray-text-2);
    min-width: 200px;
    height: auto;
    position: relative;
    overflow: hidden;

    @media screen and (hover: hover) {
      &:hover {
        background-color: var(--gray-container-1);
      }
    }
  `,
  previous: css`
    justify-content: end;
  `,
  next: css`
    justify-content: start;
  `,
};

export function SiblingPageLinks(props: SiblingPageLinksProps) {
  const { currentSlug, className, pages, ...other } = props;

  const flattenedPages = flattenSitepmap(pages);
  const currentIndex = flattenedPages.findIndex((page) => page.pathname === currentSlug);

  const previousPage = flattenedPages[currentIndex - 1];
  const nextPage = flattenedPages[currentIndex + 1];

  return (
    <Root {...other} className={className}>
      {previousPage && (
        <LinkBlock href={previousPage.pathname} relation="previous">
          {previousPage.title}
        </LinkBlock>
      )}
      {previousPage && nextPage && <Separator role="separator" />}
      {nextPage && (
        <LinkBlock href={nextPage.pathname} relation="next">
          {nextPage.title}
        </LinkBlock>
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

interface LinkBlockProps {
  href: string;
  children: React.ReactNode;
  relation: 'previous' | 'next';
}

const LinkRoot = styled.div`
  gap: var(--space-2);
  flex-direction: column;
  display: flex;
  align-items: end;

  /* @ts-ignore */
  .${link.previous} & {
    align-items: end;
  }

  /* @ts-ignore */
  .${link.next} & {
    align-items: start;
  }
`;

const LinkLabel = styled.span`
  margin: 0;
  font-family: var(--ff-sans);
  font-weight: var(--fw-1);
  font-size: var(--fs-3);
  line-height: 20px;
  color: var(--gray-text-1);
`;

function LinkBlock(props: LinkBlockProps) {
  const { href, relation, children } = props;

  return (
    <Link href={href} className={clsx(link.root, link[relation])}>
      <LinkRoot>
        <LinkLabel>{relation === 'previous' ? 'Previous' : 'Next'}</LinkLabel>
        <div
          sx={(theme) => ({
            display: 'flex',
            gap: theme.vars.space[1],
            alignItems: 'center',
          })}
        >
          {relation === 'previous' && <GrowingChevron direction="left" />}
          <span
            sx={(theme) => ({
              fontSize: theme.vars.fs[4],
              lineHeight: 23,
              margin: '0',
              fontFamily: theme.vars.ff.sans,
              fontWeight: theme.vars.fw[1],
              color: theme.gray.text[2],
            })}
          >
            {children}
          </span>
          {relation === 'next' && <GrowingChevron direction="right" />}
        </div>
      </LinkRoot>
    </Link>
  );
}

interface GrowingChevronProps {
  direction: 'left' | 'right';
}

function GrowingChevron(props: GrowingChevronProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={clsx(classes.chevron, props.direction)}
    >
      <path d="M2.5 8H13.5" stroke="currentColor" strokeLinecap="round" className={classes.line} />
      <path
        d="M9 3.5L13.5 8L9 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classes.tip}
      />
    </svg>
  );
}
