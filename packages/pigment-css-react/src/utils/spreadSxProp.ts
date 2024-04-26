import { NodePath, types as astService } from '@babel/core';
import {
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
    return;
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
  if (sxPath) {
    const expression = sxPath.get('value');
    if ('node' in expression) {
      if (target.isObjectExpression()) {
        target.node.properties.push(astService.spreadElement(expression.node as Expression));
      }
      if (target.isJSXOpeningElement() && expression.isJSXExpressionContainer()) {
        target.node.attributes.push(
          astService.jsxSpreadAttribute(expression.node.expression as Expression),
        );
      }
    }
    sxPath.remove();
  }
  tagPath.node.arguments.push(astService.objectExpression(props));
}
