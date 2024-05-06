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
      ..._sx('s5molx8', {
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
      ..._sx3('s2bbd3t', {}),
    }),
    ..._sx2('s7fszdm', {
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
      ? _sx4('s1ou6jyi', {
          ...props,
        })
      : _sx4('s1lqy6hu', {
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
          className: 'swssabr',
          vars: {
            'swssabr-0': [props.isRed ? 'red' : 'blue', false],
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
    ..._sx6('sblg7d5', {}),
  });
}
function App6(props) {
  return /*#__PURE__*/ _jsx('div', {
    ..._sx7('s1xq3929', {}),
  });
}
