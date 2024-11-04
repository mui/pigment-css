import * as React from 'react';
import { Callout } from './Callout';
import { Description } from './Description';
import { ComponentLinkHeader } from './ComponentLinkedHeader';

function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { id, children, ...other } = props;

  if (id) {
    return (
      <h2 id={id} {...other}>
        <a href={`#${id}`}>{children}</a>
      </h2>
    );
  }

  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h2 {...props} />;
}

function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { id, children, ...other } = props;

  if (id) {
    return (
      <h3 id={id} {...other}>
        <a href={`#${id}`}>{children}</a>
      </h3>
    );
  }

  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h3 {...props} />;
}

export const components = {
  Description,
  Callout,
  ComponentLinkHeader,
  h2: H2,
  h3: H3,
};
