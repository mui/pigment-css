function App() {
  return /*#__PURE__*/ _jsx(
    'div',
    {
      sx: {
        display: 'flex',
        flexDirection: 'column',
      },
      children: 'Test',
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
    sx: {
      display: 'flex',
      flexDirection: 'column',
    },
    children: /*#__PURE__*/ _jsx('p', {
      sx: {
        color: 'red',
      },
      children: 'Test',
    }),
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
    sx: props.variant === 'secondary' && { color: props.isRed ? 'red' : 'blue' },
    children: 'test',
  });
}
