import visuallyHidden from '../visuallyHidden';

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
      style: { textAlign: 'center' },
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
      sx: (theme) => ({
        color: (theme.vars || theme).palette.primary.main,
        ...theme.applyStyles('dark', {
          color: 'white',
        }),
      }),
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
    ...props,
  });
}

function App4(props) {
  return /*#__PURE__*/ _jsx('div', {
    sx: props.variant === 'secondary' && { color: props.isRed ? 'red' : 'blue' },
    className: `foo ${props.className}`,
    ...props,
    children: 'test',
  });
}

function App5(props) {
  return /*#__PURE__*/ _jsx('div', {
    sx: visuallyHidden,
  });
}

const styles = {
  visuallyHidden,
};
function App6(props) {
  return /*#__PURE__*/ _jsx('div', {
    sx: styles.visuallyHidden,
  });
}
