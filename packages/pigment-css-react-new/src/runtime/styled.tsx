import { Primitive } from '@pigment-css/core';
import { ClassInfo, css } from '@pigment-css/core/runtime';
import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';

type StyledInfo = ClassInfo & {
  displayName?: string;
  vars?: Record<string, [(...args: unknown[]) => Primitive, boolean]>;
};

function isHtmlTag(tag: unknown): tag is string {
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

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
  let shouldUseAs = !shouldForwardPropLocal('as');

  // @ts-expect-error
  // eslint-disable-next-line no-underscore-dangle
  if (typeof tag !== 'string' && tag.__styled_by_pigment_css) {
    // If the tag is a Pigment styled component,
    // render the styled component and pass the `as` prop down
    shouldUseAs = false;
  }

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
      const Component = (shouldUseAs && props.as) || tag;
      let shouldForwardPropComponent = shouldForwardPropLocal;

      // Reassign `shouldForwardProp` if incoming `as` prop is a React component
      if (!isHtmlTag(Component)) {
        shouldForwardPropComponent = defaultShouldForwardProp;
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const key in props) {
        if (shouldForwardPropComponent(key)) {
          newProps[key] = props[key];
        }
      }
      newProps.className = variants.length ? cssFn(props) : baseClasses;
      newProps.style = {
        ...props.style,
        ...getStyle(props, vars),
      };

      return <Component ref={ref} {...newProps} />;
    });

    if (displayName) {
      StyledComponent.displayName = displayName;
    } else {
      StyledComponent.displayName = `Styled(${typeof tag === 'string' ? tag : 'Pigment'})`;
    }

    // @ts-expect-error No TS check required
    // eslint-disable-next-line no-underscore-dangle
    StyledComponent.__styled_by_pigment_css = true;

    return StyledComponent;
  }

  return scopedStyled;
}
