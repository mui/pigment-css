import { sx as _sx, sx as _sx2, sx as _sx3 } from '@pigment-css/react';
function App() {
  return /*#__PURE__*/ _jsx(
    'div',
    {
      children: 'Test',
      ..._sx('s5molx8', {}),
    },
    void 0,
    false,
    {
      fileName: '',
      lineNumber: 11,
      columnNumber: 11,
    },
    this,
  );
}
function App2() {
  return /*#__PURE__*/ _jsx('div', {
    children: /*#__PURE__*/ _jsx('p', {
      children: 'Test',
      ..._sx3('s2bbd3t', {}),
    }),
    ..._sx2('s7fszdm', {}),
  });
}
function App3(props) {
  return /*#__PURE__*/ _jsx('div', {
    sx: props.disabled
      ? {
          opacity: 0.4,
        }
      : {
          color: 'red',
        },
    children: 'test',
  });
}
function App4(props) {
  return /*#__PURE__*/ _jsx('div', {
    sx: props.variant === 'secondary' && {
      color: props.isRed ? 'red' : 'blue',
    },
    children: 'test',
  });
}
