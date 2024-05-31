import { createExtendSxProp as _createExtendSxProp } from '@pigment-css/react';
const extendSxProp = /*#__PURE__*/ _createExtendSxProp();
export default function Typography(inProps) {
  const props = extendSxProp(inProps);
  return <div {...props} />;
}
