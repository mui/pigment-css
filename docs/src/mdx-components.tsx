import * as React from 'react';
import type { MDXComponents } from 'mdx/types';

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
};

export function useMDXComponents(comp: MDXComponents): MDXComponents {
  return {
    ...comp,
    ...mdxComponents,
  };
}
