// @ts-check
import { valueToEstree } from 'estree-util-value-to-estree';

export function createMdxElement({
  name,
  children,
  props = {},
}: {
  name: string;
  children: unknown[];
  props?: Record<string, unknown>;
}) {
  // Native HTML elements are rendered as regular tags
  if (name.toLowerCase() === name) {
    return {
      type: 'element',
      tagName: name,
      properties: props,
      children,
    };
  }

  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: Object.entries(props).map(([key, value]) => ({
      type: 'mdxJsxAttribute',
      name: key,
      value: getAttributeValue(value),
    })),
    data: { _mdxExplicitJsx: true },
    children,
  };
}

/**
 * @param {unknown} value
 */
function getAttributeValue(value: unknown) {
  if (typeof value === 'string') {
    return value;
  }

  return {
    type: 'mdxJsxAttributeValueExpression',
    value: JSON.stringify(value),
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: valueToEstree(value),
          },
        ],
        sourceType: 'module',
      },
    },
  };
}
