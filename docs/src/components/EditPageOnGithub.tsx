import { css } from '@pigment-css/react';
import * as React from 'react';
import Link from 'next/link';
import { GitHubIcon } from './icons/Github';

export interface EditPageOnGithubProps {
  category: string;
  slug: string;
  isMd: boolean;
}

const linkClass = css(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.vars.space[1],
  cursor: 'pointer',
  textDecoration: 'none !important',
  color: 'inherit',
  position: 'relative',
  zIndex: 0,
  fontSize: theme.vars.fs[3],
  lineHeight: '20px',
  fontFamily: theme.vars.ff.sans,
  '@media screen and (hover: hover)': { '&:hover': { textDecoration: 'none' } },
}));

export function EditPageOnGithub(props: EditPageOnGithubProps) {
  const { category, slug, isMd } = props;

  const url = `${process.env.REPO_ROOT}/edit/${process.env.DEFAULT_BRANCH}/docs/data/${category}/${slug}/${slug}.${isMd ? 'md' : 'mdx'}`;
  return (
    <Link href={url} className={linkClass} target="_blank" rel="noopener nofollow">
      <GitHubIcon />
      <span>Edit this page</span>
    </Link>
  );
}
