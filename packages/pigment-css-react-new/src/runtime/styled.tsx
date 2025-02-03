import { Primitive } from '@pigment-css/core';
import { ClassInfo, css } from '@pigment-css/core/runtime';
import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';

type StyledInfo = ClassInfo & {
  displayName?: string;
  vars?: Record<string, [(...args: unknown[]) => Primitive, boolean]>;
};

function defaultShouldForwardProp(propName: string): boolean {
  // if first character is $
  if (propName.charCodeAt(0) === 36) {
    return false;
  }
  if (propName === 'as') {
    return false;
  }
  return true;
}

function shouldForwardProp(propName: string) {
  if (defaultShouldForwardProp(propName)) {
    return isPropValid(propName);
  }
  return false;
}

function getStyle(props: ClassInfo['defaultVariants'], vars: StyledInfo['vars']) {
  const newStyle: Record<string, Primitive> = {};
  if (!props || !vars) {
    return newStyle;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in vars) {
    if (!vars.hasOwnProperty(key)) {
      continue;
    }
    const [variableFunction, isUnitLess] = vars[key];
    const value = variableFunction(props);
    if (typeof value === 'undefined') {
      continue;
    }
    if (typeof value === 'string' || isUnitLess) {
      newStyle[key] = value;
    } else {
      newStyle[key] = `${value}px`;
    }
  }
  return newStyle;
}

export function styled<T extends React.ElementType>(tag: T) {
  if (process.env.NODE_ENV === 'development') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
      );
    }
  }
  const shouldForwardPropLocal =
    typeof tag === 'string' ? shouldForwardProp : defaultShouldForwardProp;

  function scopedStyled({
    classes,
    variants = [],
    defaultVariants = {},
    vars,
    displayName = '',
  }: StyledInfo) {
    const cssFn = css({
      classes,
      variants,
      defaultVariants,
    });
    const baseClasses = cssFn();

    const StyledComponent = React.forwardRef<
      React.ComponentRef<T>,
      React.ComponentPropsWithoutRef<T> & {
        as?: React.ElementType;
        className?: string;
        style?: React.CSSProperties;
      }
    >(function render(props, ref) {
      const newProps: Record<string, unknown> = {};

      // eslint-disable-next-line no-restricted-syntax
      for (const key in props) {
        // if first char is $
        if (shouldForwardPropLocal(key)) {
          newProps[key] = props[key];
        }
      }
      newProps.className = variants.length === 0 ? baseClasses : baseClasses;
      newProps.style = {
        ...props.style,
        ...getStyle(props, vars),
      };

      const Component = props.as ?? tag;
      return <Component ref={ref} {...newProps} />;
    });

    if (displayName) {
      StyledComponent.displayName = displayName;
    } else {
      StyledComponent.displayName = 'Styled(Pigment)';
    }

    // @ts-expect-error No TS check required
    // eslint-disable-next-line no-underscore-dangle
    StyledComponent.__styled_by_pigment_css = true;

    return StyledComponent;
  }

  return scopedStyled;
}
