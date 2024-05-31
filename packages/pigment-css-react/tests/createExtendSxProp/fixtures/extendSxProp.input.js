import { createExtendSxProp } from '../zero-styled';

const extendSxProp = createExtendSxProp();

export default function Typography(inProps) {
  const props = extendSxProp(inProps);
  return <div {...props} />;
}
