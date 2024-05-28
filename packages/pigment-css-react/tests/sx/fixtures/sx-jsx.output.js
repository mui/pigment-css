import {
  sx as _sx,
  sx as _sx2,
  sx as _sx3,
  sx as _sx4,
  sx as _sx5,
  sx as _sx6,
  sx as _sx7,
} from '@pigment-css/react';
function App() {
  return /*#__PURE__*/ _jsx(
    'div',
    {
      children: 'Test',
      className: 'foo',
      style: {
        textAlign: 'center',
      },
      ..._sx('sms9jur', {
        className: 'foo',
        style: {
          textAlign: 'center',
        },
      }),
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
    className: props.className,
    style: props.style,
    children: /*#__PURE__*/ _jsx('p', {
      children: 'Test',
      ..._sx3('sx1n5bw', {}),
    }),
    ..._sx2('s1934eew', {
      className: props.className,
      style: props.style,
    }),
  });
}
function App3(props) {
  return /*#__PURE__*/ _jsx('div', {
    children: 'test',
    ...props,
    ...(props.disabled
      ? _sx4('s1uhwhc6', {
          ...props,
        })
      : _sx4('sr0l0wy', {
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
      _sx5(
        {
          className: 's1tnwy45',
          vars: {
            's1tnwy45-0': [props.isRed ? 'red' : 'blue', false],
          },
        },
        {
          className: `foo ${props.className}`,
          ...props,
        },
      )),
  });
}
function App5(props) {
  return /*#__PURE__*/ _jsx('div', {
    ..._sx6('s14rwdtw', {}),
  });
}
function App6(props) {
  return /*#__PURE__*/ _jsx('div', {
    ..._sx7('su4gtw5', {}),
  });
}
