import { styled } from '@pigment-css/react-new';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export const Viewport = styled(ScrollArea.Viewport)`
  height: 100%;

  /* Scroll containers may be focusable */
  &:focus-visible {
    position: relative;
    outline: 2px solid var(--color-blue);
    outline-offset: -1px;
    z-index: 1;
  }
`;

export const Scrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  border-radius: 0.375rem;

  opacity: 0;
  transition: opacity 150ms 300ms;

  &[data-scrolling] {
    opacity: 1;
    transition-duration: 75ms;
    transition-delay: 0ms;
  }

  @media (hover: hover) {
    &:hover {
      transition-duration: 75ms;
      transition-delay: 25ms;
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    border-radius: inherit;
  }

  &[data-orientation='horizontal'] {
    align-items: center;
    height: 1.25rem;
    margin-inline: 0.5rem;

    &::before {
      height: 0.25rem;
      inset-inline: 0;
      background-color: var(--color-gray-200);
    }
  }

  &[data-orientation='vertical'] {
    justify-content: center;
    width: 1.25rem;
    margin-block: 0.5rem;

    &::before {
      width: 0.25rem;
      inset-block: 0;
      background-color: var(--color-gray-200);
    }
  }
`;

export const Thumb = styled(ScrollArea.Thumb)`
  position: relative;
  border-radius: inherit;
  background-color: var(--color-gray-400);

  &[data-orientation='horizontal'] {
    height: 0.25rem;
  }

  &[data-orientation='vertical'] {
    width: 0.25rem;
  }

  /* Draggable area */
  &::before {
    content: '';
    position: absolute;
    inset: -0.5rem;
  }
`;
