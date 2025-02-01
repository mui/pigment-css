/**
 * This module is not supposed to be imported by users.
 */
type Props = Record<string, string | number>;

export type VariantInfo = {
  $$cls: string;
  props: Props;
};

export type ClassInfo = {
  classes: string;
  variants?: VariantInfo[];
};

function isVariantMatching(props: Props, variantProps: Props) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in variantProps) {
    if (!variantProps.hasOwnProperty(key)) {
      continue;
    }
    if (variantProps[key] !== props[key]) {
      return false;
    }
  }
  return true;
}

export function css({ classes, variants = [] }: ClassInfo) {
  return (props?: Props) => {
    if (!props || !variants.length) {
      return classes;
    }
    const newClasses = [];
    for (let i = 0; i < variants.length; i += 1) {
      const variant = variants[i];
      if (isVariantMatching(props, variant.props)) {
        newClasses.push(variant.$$cls);
      }
    }
    if (!newClasses.length) {
      return classes;
    }
    return `${classes} ${newClasses.join(' ')}`;
  };
}
