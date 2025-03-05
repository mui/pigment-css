import { styled } from '@pigment-css/react-new';

export const Code = styled.code`
  letter-spacing: normal;

  /* In a code block */
  pre & {
    white-space: normal;
  }

  & [data-line] {
    display: block;
    white-space: pre;
    padding-inline: 0.75rem;
  }

  & [data-line]:empty {
    height: 1lh;
  }

  & mark {
    display: inline-block;
  }
`;
