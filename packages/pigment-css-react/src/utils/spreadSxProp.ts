import { NodePath, types as astService } from '@babel/core';
import {
  ArrayExpression,
  CallExpression,
  Expression,
  JSXAttribute,
  JSXOpeningElement,
  JSXSpreadAttribute,
  ObjectExpression,
  ObjectMethod,
  ObjectProperty,
  SpreadElement,
} from '@babel/types';

function isSxProp(path: NodePath) {
  if (path.isJSXAttribute() && path.node.name.name === 'sx') {
    return true;
  }
  if (
    path.isObjectProperty() &&
    path.node.key.type === 'Identifier' &&
    path.node.key.name === 'sx'
  ) {
    return true;
  }
  return false;
}

function isSpreadExpression(path: NodePath) {
  return path.isSpreadElement() || path.isJSXSpreadAttribute();
}

function getProps(paths: NodePath[]) {
  const props: Array<SpreadElement | ObjectProperty> = [];
  let sxPath: undefined | NodePath<JSXAttribute> | NodePath<ObjectProperty>;
  paths.forEach((attr) => {
    if (isSxProp(attr)) {
      sxPath = attr as NodePath<JSXAttribute> | NodePath<ObjectProperty>;
    } else if (isSpreadExpression(attr)) {
      let containRuntimeSx = false;
      attr.traverse({
        CallExpression(path) {
          const callee = path.get('callee');
          if (callee.isIdentifier() && callee.node.name.startsWith('_sx')) {
            containRuntimeSx = true;
          }
        },
      });
      if (!containRuntimeSx) {
        props.push(
          astService.spreadElement(
            (attr as NodePath<JSXSpreadAttribute | SpreadElement>).node.argument,
          ),
        );
      }
    } else if (
      attr.isJSXAttribute() &&
      (attr.node.name.name === 'className' || attr.node.name.name === 'style')
    ) {
      const value = attr.get('value');
      if (value.isJSXExpressionContainer()) {
        props.push(
          astService.objectProperty(
            astService.identifier(attr.node.name.name),
            value.get('expression').node as any,
          ),
        );
      } else {
        props.push(
          astService.objectProperty(
            astService.identifier(attr.node.name.name),
            attr.node.value as any,
          ),
        );
      }
    } else if (
      attr.isObjectProperty() &&
      attr.node.key.type === 'Identifier' &&
      (attr.node.key.name === 'className' || attr.node.key.name === 'style')
    ) {
      props.push(
        astService.objectProperty(
          astService.identifier(attr.node.key.name),
          attr.node.value as any,
        ),
      );
    }
  });
  return { props, sxPath };
}

/**
 * Convert the sx prop that contains the sx() call to runtime {...sx()} spread.
 *
 * It will try to find the sibling `className` and `style` props and put them in the second argument of
 * the runtime sx call.
 */
export default function spreadSxProp(tagPath: NodePath<CallExpression>) {
  const target = tagPath.findParent((p) => p.isJSXOpeningElement() || p.isObjectExpression()) as
    | NodePath<JSXOpeningElement>
    | NodePath<ObjectExpression>
    | null;
  if (!target) {
    return false;
  }
  let paths:
    | NodePath<JSXAttribute | JSXSpreadAttribute>[]
    | NodePath<ObjectProperty | SpreadElement | ObjectMethod>[] = [];
  if (target.isJSXOpeningElement()) {
    paths = target.get('attributes');
  }
  if (target.isObjectExpression()) {
    paths = target.get('properties');
  }
  const { props, sxPath } = getProps(paths);
  let spreadSxNode: undefined | SpreadElement | JSXSpreadAttribute;
  if (sxPath) {
    const expression = sxPath.get('value');
    if ('node' in expression) {
      if (target.isObjectExpression()) {
        spreadSxNode = astService.spreadElement(expression.node as Expression);
        target.node.properties.push(spreadSxNode);
      }
      if (target.isJSXOpeningElement() && expression.isJSXExpressionContainer()) {
        spreadSxNode = astService.jsxSpreadAttribute(expression.node.expression as Expression);
        target.node.attributes.push(spreadSxNode);
      }
    }
    sxPath.remove();
  }
  tagPath.node.arguments.push(astService.objectExpression(props));

  if (spreadSxNode?.argument.type === 'ArrayExpression') {
    spreadSxNode.argument = astService.callExpression(tagPath.node.callee, [
      spreadSxNode.argument,
      astService.objectExpression(props),
    ]);
  }

  // This step is required to pass information about the array argument to the outer function
  // to replace the `tagPath` with its first argument.
  //
  // Check if the sx value is an array expression
  let arrayPath: NodePath<ArrayExpression> | null = null;
  if (tagPath.parentPath.isArrayExpression()) {
    // sx call is a direct child, e.g. [_sx(...), _sx(...)]
    arrayPath = tagPath.parentPath;
  } else if (tagPath.parentPath.parentPath?.isArrayExpression()) {
    // sx call inside a conditional/logical expression, e.g. [true ? _sx(...) : _sx(...), prop && _sx(...)]
    arrayPath = tagPath.parentPath.parentPath;
  }
  if (arrayPath) {
    return true;
  }

  return false;
}
