import * as React from 'react';
import { type Toc, type TocEntry } from '@stefanprobst/rehype-extract-toc';
import { styled } from '@pigment-css/react';

interface Props {
  toc: Toc;
  renderDepth?: number;
  skipFirstLevel?: boolean;
}

const Root = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 49px;
  right: 0;
  width: 240px;
  height: calc(100% - 49px);
  padding: 12px 24px;
  overflow-y: auto;

  @media (max-width: 1242px) {
    display: none;
  }
`;

const SectionTitle = styled.h4`
  height: var(--space-7);
  display: flex;
  align-items: center;
  font-weight: var(--fw-2);
  font-size: var(--fs-3);
  line-height: 20px;
  margin: 0;
  padding-left: var(--space-2);
`;

const NavLink = styled.a`
  all: unset;
  line-height: 1.15;
  vertical-align: middle;
  background-clip: padding-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  display: flex;
  padding: var(--space-2);
  border-radius: 6px;
  align-items: center;
  font-family: var(--ff-sans);
  font-size: var(--fs-3);
  cursor: pointer;
  color: var(--gray-text-1);
  margin-left: calc(var(--space-3) * var(--indent-level));

  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--gray-container-1);
    }
  }
`;

function renderTocEntry(entry: TocEntry, renderDepth: number, skipFirstLevel: boolean) {
  if (entry.depth > renderDepth) {
    return null;
  }

  return (
    <React.Fragment key={entry.id}>
      {entry.depth === 1 && skipFirstLevel ? null : (
        <NavLink
          href={`#${entry.id}`}
          style={{ '--indent-level': entry.depth - 2 } as React.CSSProperties}
        >
          {entry.value}
        </NavLink>
      )}
      {entry.children?.map((child) => renderTocEntry(child, renderDepth, skipFirstLevel))}
    </React.Fragment>
  );
}

export function TableOfContents(props: Props) {
  const { toc, renderDepth = 2, skipFirstLevel = true } = props;

  return (
    <Root>
      <SectionTitle>Contents</SectionTitle>
      <nav>{toc.map((item) => renderTocEntry(item, renderDepth, skipFirstLevel))}</nav>
    </Root>
  );
}
