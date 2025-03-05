'use client';
import * as React from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Dialog } from '@base-ui-components/react/dialog';
import * as ReactDOM from 'react-dom';
import { useScrollLock } from '@base-ui-components/react/utils';
import {
  backdrop,
  backdropTapArea,
  closeContainer,
  navClose,
  navHeading,
  navItem,
  navLink,
  navPanel,
  navPanelInner,
  navSection,
  overscroll,
  popup,
  viewport as viewportClass,
  viewportInner,
} from './MobileNav.pigment';

export const HEADER_HEIGHT = 48;

const MobileNavStateCallback = React.createContext<(open: boolean) => void>(() => undefined);

export function Root(props: Dialog.Root.Props) {
  const state = React.useState(false);
  const [open, setOpen] = state;

  return (
    <MobileNavStateCallback.Provider value={setOpen}>
      <Dialog.Root open={open} onOpenChange={setOpen} {...props} />
    </MobileNavStateCallback.Provider>
  );
}

export const Trigger = Dialog.Trigger;

export function Backdrop({ className, ...props }: Dialog.Backdrop.Props) {
  return <Dialog.Backdrop className={clsx(`${backdrop}`, className)} {...props} />;
}

export const Portal = Dialog.Portal;

export function Popup({ className, children, ...props }: Dialog.Popup.Props) {
  return (
    <Dialog.Popup className={clsx(`${popup}`, className)} {...props}>
      <PopupImpl>{children}</PopupImpl>
    </Dialog.Popup>
  );
}

function PopupImpl({ children }: React.PropsWithChildren) {
  const [forceScrollLock, setForceScrollLock] = React.useState(false);
  const setOpen = React.useContext(MobileNavStateCallback);
  const rem = React.useRef(16);
  useScrollLock(forceScrollLock);

  React.useEffect(() => {
    rem.current = parseFloat(getComputedStyle(document.documentElement).fontSize);
  }, []);

  return (
    <React.Fragment>
      <div className={`${overscroll}`} />
      <div
        className={`${viewportClass}`}
        onScroll={(event) => {
          const viewport = event.currentTarget;
          if (viewport.scrollTop > (HEADER_HEIGHT * rem.current) / 16) {
            viewport.setAttribute('data-clipped', '');
          } else {
            viewport.removeAttribute('data-clipped');
          }
        }}
        onTouchStart={(event) => {
          const viewport = event.currentTarget;

          // Consider flicks from scroll top only (iOS does the same with its sheets)
          if (viewport.scrollTop <= 0) {
            viewport.addEventListener(
              'touchend',
              function handleTouchEnd() {
                // If touch ended and we are overscrolling past a threshold...
                if (viewport.scrollTop < -32) {
                  const y = viewport.scrollTop;
                  // Scroll lock is forced during the flick down gesture to maintain
                  // a continous blend between the native scroll inertia and our own animation
                  setForceScrollLock(true);

                  viewport.addEventListener(
                    'scroll',
                    function handleNextScroll() {
                      // ...look at whether the system's intertia scrolling is continuing the motion
                      // in the same direction. If so, the flick is strong enough to close the dialog.
                      if (viewport.scrollTop < y) {
                        // It's gonna eventually bounce back to scrollTop 0. We need to counteract this
                        // a bit so that the close transition doesn't appear slower than it should.
                        viewport.style.translate = `0px -${y}px`;
                        viewport.style.transform = `400ms`;
                        setOpen(false);

                        // Sometimes the first scroll event comes with the same scroll position
                        // If so, give it another chance, call ourselves recursively
                      } else if (viewport.scrollTop === y) {
                        viewport.addEventListener('scroll', handleNextScroll, { once: true });
                      } else {
                        setForceScrollLock(false);
                      }
                    },
                    { once: true },
                  );
                }
              },
              { once: true },
            );
          }
        }}
      >
        <div className={`${viewportInner}`}>
          {/* We need the area behind the panel to close on tap but also to scroll the viewport. */}
          <Dialog.Close className={`${backdropTapArea}`} tabIndex={-1} render={<div />} />

          <nav className={`${navPanel}`}>
            {/* Reverse order to place the close button at the end of the DOM, but at sticky top visually */}
            <div className={`${navPanelInner}`}>
              <div>{children}</div>
              <div className={`${closeContainer}`}>
                <Dialog.Close aria-label="Close the navigation" className={`${navClose}`}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 0.75L6 6M11.25 11.25L6 6M6 6L0.75 11.25M6 6L11.25 0.75"
                      stroke="currentcolor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Dialog.Close>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
}

export function Section({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(`${navSection}`, className)} {...props} />;
}

export function Heading({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={clsx(`${navHeading}`, className)} {...props}>
      <div className="headingInner">{children}</div>
    </div>
  );
}

export function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={clsx('MobileNavList', className)} {...props} />;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'li'> {
  active?: boolean;
  href: string;
  rel?: string;
}

export function Item({ active, children, className, href, rel, ...props }: ItemProps) {
  const setOpen = React.useContext(MobileNavStateCallback);
  return (
    <li className={clsx(`${navItem}`, className)} {...props}>
      <NextLink
        aria-current={active ? 'page' : undefined}
        className={`${navLink}`}
        href={href}
        rel={rel}
        // We handle scroll manually
        scroll={false}
        onClick={() => {
          if (href === window.location.pathname) {
            // If the URL is the same, close, wait a little, and scroll to top smoothly
            setOpen(false);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
          } else {
            // Otherwise, wait for the URL change before closing and scroll up instantly
            onUrlChange(() => {
              ReactDOM.flushSync(() => setOpen(false));
              window.scrollTo({ top: 0, behavior: 'instant' });
            });
          }
        }}
      >
        {children}
      </NextLink>
    </li>
  );
}

function onUrlChange(callback: () => void) {
  const initialUrl = window.location.href;

  function rafRecursively() {
    requestAnimationFrame(() => {
      if (initialUrl === window.location.href) {
        rafRecursively();
      } else {
        callback();
      }
    });
  }

  rafRecursively();
}
