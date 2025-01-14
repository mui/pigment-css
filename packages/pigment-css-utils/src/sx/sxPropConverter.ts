import { NodePath } from '@babel/core';
import { ArrowFunctionExpression, Expression, ObjectExpression } from '@babel/types';
import { sxObjectExtractor } from './sxObjectExtractor';

function isAllowedExpression(
  node: NodePath<Expression>,
): node is NodePath<ObjectExpression> | NodePath<ArrowFunctionExpression> {
  return (
    node.isObjectExpression() || node.isArrowFunctionExpression() || node.isFunctionExpression()
  );
}

export function sxPropConverter(
  node: NodePath<Expression>,
  wrapWithSxCall: (expPath: NodePath<Expression>) => void,
) {
  if (node.isArrayExpression()) {
    node.get('elements').forEach((element) => {
      if (element.isExpression()) {
        sxPropConverter(element, wrapWithSxCall);
      }
    });
  } else if (node.isConditionalExpression()) {
    const consequent = node.get('consequent');
    const alternate = node.get('alternate');

    if (isAllowedExpression(consequent)) {
      sxObjectExtractor(consequent);
      wrapWithSxCall(consequent);
    }
    if (isAllowedExpression(alternate)) {
      sxObjectExtractor(alternate);
      wrapWithSxCall(alternate);
    }
  } else if (node.isLogicalExpression()) {
    const right = node.get('right');
    if (isAllowedExpression(right)) {
      sxObjectExtractor(right);
      wrapWithSxCall(right);
    }
  } else if (isAllowedExpression(node)) {
    sxObjectExtractor(node);
    wrapWithSxCall(node);
  } else if (node.isIdentifier()) {
    const rootScope = node.scope.getProgramParent();
    const binding = node.scope.getBinding(node.node.name);
    // Simplest case, ie, const styles = {static object}
    // and is used as <Component sx={styles} />
    if (binding?.scope === rootScope) {
      wrapWithSxCall(node);
    }
  } else if (node.isMemberExpression()) {
    let current: NodePath<Expression> = node;
    while (current.isMemberExpression()) {
      current = current.get('object');
    }
    if (current.isIdentifier()) {
      const rootScope = current.scope.getProgramParent();
      const binding = current.scope.getBinding(current.node.name);
      if (binding?.scope === rootScope) {
        wrapWithSxCall(node);
      }
    }
  }
}
