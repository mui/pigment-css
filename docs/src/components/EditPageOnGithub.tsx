import { styled } from '@pigment-css/react';
import * as React from 'react';

export interface EditPageOnGithubProps {
  category: string;
  slug: string;
}

const REPO_ROOT = 'https://github.com/mui/pigment-css';
// #default-branch-switch
const DEFAULT_BRANCH = 'master';

const Link = styled.a(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'underline',
  textDecorationLine: 'underline',
  textDecorationStyle: 'solid',
  textDecorationThickness: '1px',
  textUnderlineOffset: 'calc(0.1em + 3px)',
  color: 'inherit',
  position: 'relative',
  zIndex: 0,
  fontSize: theme.vars.fs[3],
  lineHeight: '20px',
  fontFamily: theme.vars.ff.sans,
  '@media screen and (hover: hover)': { '&:hover': { textDecoration: 'none' } },
}));

export function EditPageOnGithub(props: EditPageOnGithubProps) {
  const { category, slug } = props;

  const url = `${REPO_ROOT}/edit/${DEFAULT_BRANCH}/docs/data/${category}/${slug}/${slug}.mdx`;
  return (
    <Link href={url} target="_blank" rel="noopener nofollow">
      Edit this page on GitHub
    </Link>
  );
}
