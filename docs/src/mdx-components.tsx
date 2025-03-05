import * as React from 'react';
import type { MDXComponents } from 'mdx/types';

import * as CodeBlock from './components/CodeBlock';
import * as Styled from './mdx-components.pigment';
import { Link } from './components/Link';
import { getChildrenText } from './utils/getChildrenText';

export const mdxComponents: MDXComponents = {
  a: (props) => <Link {...props} />,
  h1: (props) => (
    <React.Fragment>
      <Styled.Heading {...props} />
      <title>{getChildrenText(props.children)}</title>
    </React.Fragment>
  ),
  h2: (props) => (
    <React.Fragment>
      <Styled.Heading as="h2" lvl="two" {...props} />
      <div className="inner-separator" />
    </React.Fragment>
  ),
  h3: (props) => <Styled.Heading as="h3" lvl="three" {...props} />,
  h4: (props) => <Styled.Heading as="h4" lvl="other" {...props} />,
  h5: (props) => <Styled.Heading as="h5" lvl="other" {...props} />,
  h6: (props) => <Styled.Heading as="h6" lvl="other" {...props} />,
  p: (props) => <Styled.Paragraph {...props} />,
  li: (props) => <Styled.Li {...props} />,
  ul: (props) => <Styled.Ul {...props} />,
  ol: (props) => <Styled.Ol {...props} />,
  strong: (props) => <Styled.Strong {...props} />,
  figure: (props) => {
    if ('data-rehype-pretty-code-figure' in props) {
      return <Styled.CodeBlock.Root {...props} />;
    }

    return <figure {...props} />;
  },
  figcaption: (props) => {
    if ('data-rehype-pretty-code-title' in props) {
      return <CodeBlock.Panel {...props} />;
    }

    return <figcaption {...props} />;
  },
  // code: (props) => <Styled.Code {...props} />,
  // Don't pass the tabindex prop from shiki, most browsers
  // now handle scroll containers focus out of the box
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pre: ({ tabIndex: _tabIndex, ...props }) => <CodeBlock.Pre {...props} />,
  Subtitle: (props) => <Styled.Subtitle {...props} />,
  Meta: (props: React.ComponentProps<'meta'>) => {
    if (props.name === 'description' && String(props.content).length > 170) {
      throw new Error('Meta description shouldn’t be longer than 170 chars');
    }
    return <meta {...props} />;
  },
};

export const inlineMdxComponents: MDXComponents = {
  ...mdxComponents,
  p: (props) => <p {...props} />,
};

export function useMDXComponents(comp: MDXComponents): MDXComponents {
  return {
    ...comp,
    ...mdxComponents,
  };
}
