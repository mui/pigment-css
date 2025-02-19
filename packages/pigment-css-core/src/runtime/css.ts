/**
 * This module is not supposed to be imported by users.
 */
type Props = Record<string, string | number | boolean>;

export type VariantInfo = {
  $$cls: string;
  props: Props;
};

export type ClassInfo = {
  classes: string;
  variants?: VariantInfo[];
  defaultVariants?: Props;
};

export function isVariantMatching(props: Props, variantProps: Props, defaultVariants: Props = {}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in variantProps) {
    if (!variantProps.hasOwnProperty(key)) {
      continue;
    }
    const propValue = props[key] ?? defaultVariants[key];
    // eslint-disable-next-line eqeqeq
    if (variantProps[key] != propValue) {
      return false;
    }
  }
  return true;
}

export function css({ classes, variants = [], defaultVariants = {} }: ClassInfo) {
  let baseClasses = classes;

  if (variants.length > 0) {
    const newClasses = [];
    for (let i = 0; i < variants.length; i += 1) {
      const variant = variants[i];
      if (isVariantMatching(defaultVariants, variant.props)) {
        newClasses.push(variant.$$cls);
      }
    }
    if (newClasses.length > 0) {
      baseClasses = `${baseClasses} ${newClasses.join(' ')}`;
    }
  }
  function cssWithProps(props?: Props) {
    if (!props || !variants.length) {
      return baseClasses;
    }

    const newClasses = [];
    for (let i = 0; i < variants.length; i += 1) {
      const variant = variants[i];
      if (isVariantMatching(props, variant.props, defaultVariants)) {
        newClasses.push(variant.$$cls);
      }
    }
    if (!newClasses.length) {
      return classes;
    }
    return `${classes} ${newClasses.join(' ')}`;
  }
  cssWithProps.toString = function toString() {
    return baseClasses;
  };
  return cssWithProps;
}
