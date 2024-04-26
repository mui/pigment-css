import { sx as _sx, sx as _sx2, sx as _sx3 } from '@pigment-css/react';
function App() {
  return /*#__PURE__*/ _jsx(
    'div',
    {
      sx: {
        display: 'flex',
        flexDirection: 'column',
      },
      children: 'Test',
      className: 'foo',
      style: {
        textAlign: 'center',
      },
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
function App2(props) {
  return /*#__PURE__*/ _jsx('div', {
    sx: {
      display: 'flex',
      flexDirection: 'column',
    },
    className: props.className,
    style: props.style,
    children: /*#__PURE__*/ _jsx('p', {
      children: 'Test',
      ..._sx('s5molx8', {}),
    }),
  });
}
function App3(props) {
  return /*#__PURE__*/ _jsx('div', {
    children: 'test',
    ...props,
    ...(props.disabled
      ? _sx2('s7fszdm', {
          ...props,
        })
      : _sx2('s2bbd3t', {
          ...props,
        })),
  });
}
function App4(props) {
  return /*#__PURE__*/ _jsx('div', {
    className: `foo ${props.className}`,
    ...props,
    children: 'test',
    ...(props.variant === 'secondary' &&
      _sx3(
        {
          className: 's1ou6jyi',
          vars: {
            's1ou6jyi-0': [props.isRed ? 'red' : 'blue', false],
          },
        },
        {
          className: `foo ${props.className}`,
          ...props,
        },
      )),
  });
}
