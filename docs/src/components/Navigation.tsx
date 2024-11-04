import * as React from 'react';
import Link from 'next/link';
import { RouteMetadata } from '@data/pages';
import { css, styled } from '@pigment-css/react';

interface NavigationProps {
  routes: readonly RouteMetadata[];
}

const Root = styled.aside`
  box-sizing: border-box;
  position: fixed;
  top: 49px;
  width: 240px;
  height: calc(100% - 49px);
  padding: 12px;
  overflow-y: auto;

  @media (max-width: 1002px) {
    display: none;
  }
`;

const Section = styled.section`
  padding-bottom: var(--space-4);
`;
const SectionTitle = styled.h4(({ theme }) => ({
  height: theme.vars.space[7],
  display: 'flex',
  alignItems: 'center',
  fontWeight: theme.vars.fw[2],
  fontSize: theme.vars.fs[3],
  fontFamily: theme.vars.ff.sans,
  lineHeight: '20px',
  paddingLeft: theme.vars.space[3],
  margin: '0',
}));

const link = css`
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
  height: var(--space-7);
  align-items: center;
  font-family: var(--ff-sans);
  font-size: var(--fs-3);
  cursor: pointer;
  color: var(--gray-text-2);

  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--gray-container-1);
    }
  }
`;

const sublink = css`
  padding-left: var(--space-6);
`;

export function Navigation(props: NavigationProps) {
  return (
    <Root>
      {props.routes.map((route) => (
        <Section key={route.pathname}>
          <SectionTitle>{route.title}</SectionTitle>
          {route.children?.map((child) => (
            <React.Fragment key={child.pathname}>
              <Link key={child.pathname} href={child.pathname} className={link}>
                {child.title}
              </Link>
              {child.children?.map((subchild) => (
                <Link key={subchild.pathname} href={subchild.pathname} className={sublink}>
                  {subchild.title}
                </Link>
              ))}
            </React.Fragment>
          ))}
        </Section>
      ))}
    </Root>
  );
}
