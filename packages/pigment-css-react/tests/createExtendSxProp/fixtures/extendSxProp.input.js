import { internal_createExtendSxProp } from '../zero-styled';

const extendSxProp = internal_createExtendSxProp();

export default function Typography(inProps) {
  const props = extendSxProp(inProps);
  return <div {...props} />;
}
