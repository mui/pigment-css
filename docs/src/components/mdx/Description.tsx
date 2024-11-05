import { styled } from '@pigment-css/react';
import * as React from 'react';

export interface DescriptionProps extends React.ComponentProps<'p'> {
  text?: string;
}

const Paragraph = styled.p`
  color: var(--gray-text-1);
  font-weight: var(--fw-1);
  font-size: var(--fs-5);
  scroll-margin-top: 80px;
  margin-bottom: var(--space-6);
  font-family: var(--ff-sans);
`;

export function Description(props: DescriptionProps) {
  const { text, children, ...other } = props;

  return (
    <Paragraph {...other} className={props.className}>
      {text ?? children}
    </Paragraph>
  );
}
