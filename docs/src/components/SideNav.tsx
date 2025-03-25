'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { ScrollArea, SCROLL_TIMEOUT } from '@base-ui-components/react/scroll-area';
import scrollIntoView from 'scroll-into-view-if-needed';

import * as Styled from './SideNav.pigment';
import { HEADER_HEIGHT } from './MobileNav';

interface SideNavContextValue {
  /**
   * Whether we are programmatically scrolling an item into view.
   * We make sure that the scrollbar is visible only during user interaction.
   */
  scrollingIntoView: boolean;
  setScrollingIntoView: (value: boolean) => void;
}

const SideNavContext = React.createContext<SideNavContextValue>({
  scrollingIntoView: false,
  setScrollingIntoView: () => undefined,
});

export function Root({ children, className, ...props }: React.ComponentProps<'div'>) {
  const [scrollingIntoView, setScrollingIntoView] = React.useState(false);
  const contextValue = React.useMemo(
    () => ({ scrollingIntoView, setScrollingIntoView }),
    [scrollingIntoView, setScrollingIntoView],
  );

  return (
    <SideNavContext.Provider value={contextValue}>
      <Styled.Root aria-label="Main navigation" className={className} {...props}>
        <ScrollArea.Root>
          <Styled.ViewPort data-side-nav-viewport>{children}</Styled.ViewPort>
          <Styled.ScrollBar orientation="vertical" render={<Scrollbar />}>
            <Styled.ScrollBarThumb />
          </Styled.ScrollBar>
        </ScrollArea.Root>
      </Styled.Root>
    </SideNavContext.Provider>
  );
}

function Scrollbar(props: Record<string, unknown>) {
  const { scrollingIntoView } = React.useContext(SideNavContext);

  // Prevent `data-scrolling` from being set when scrolling into view programmatically
  const dataScrolling = scrollingIntoView ? undefined : props['data-scrolling'];
  return <div {...props} data-scrolling={dataScrolling} />;
}

export function Section({ className, ...props }: React.ComponentProps<'div'>) {
  return <Styled.Section className={className} {...props} />;
}

export function Heading({ className, ...props }: React.ComponentProps<'div'>) {
  return <Styled.Heading className={className} {...props} />;
}

export function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={className} {...props} />;
}

interface ItemProps extends React.ComponentProps<'li'> {
  active?: boolean;
  href: string;
}

const SCROLL_MARGIN = 48;

export function Item({ children, className, href, ...props }: ItemProps) {
  const { setScrollingIntoView } = React.useContext(SideNavContext);
  const ref = React.useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const active = pathname === href;
  const rem = React.useRef(16);

  React.useEffect(() => {
    rem.current = parseFloat(getComputedStyle(document.documentElement).fontSize);
  }, []);

  React.useEffect(() => {
    if (ref.current && active) {
      const scrollMargin = (SCROLL_MARGIN * rem.current) / 16;
      const headerHeight = (HEADER_HEIGHT * rem.current) / 16;
      const viewport = document.querySelector('[data-side-nav-viewport]');

      if (!viewport) {
        return;
      }

      scrollIntoView(ref.current, {
        block: 'nearest',
        scrollMode: 'if-needed',
        boundary: (parent) => viewport.contains(parent),
        behavior: (actions) => {
          if (actions.length > 0) {
            // We are scrolling into view, update upstream state
            setScrollingIntoView(true);
            // Sync flag removal with ScrollArea's own scrolling state timeout
            setTimeout(() => setScrollingIntoView(false), SCROLL_TIMEOUT + 50);
          }
          actions.forEach(({ top }) => {
            const dir = viewport.scrollTop > top ? -1 : 1;
            const offset = Math.max(0, headerHeight - Math.max(0, window.scrollY));
            viewport.scrollTop = top + offset + scrollMargin * dir;
          });
        },
      });
    }
  }, [active, setScrollingIntoView]);

  return (
    <Styled.NavItem ref={ref} className={className} {...props}>
      <Styled.NavLink
        aria-current={active ? 'page' : undefined}
        data-active={active || undefined}
        href={href}
        scroll={!active}
        onClick={() => {
          // Scroll to top smoothly when clicking on the currently active item
          if (active) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <span>{children}</span>
      </Styled.NavLink>
    </Styled.NavItem>
  );
}
