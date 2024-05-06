import { jsx as _jsx } from 'react/jsx-runtime';

<div sx={[{ opacity: 1 }]} />;

<div className="foo" style={{ opacity: 1 }} sx={[{ color: 'red' }, { color: 'green' }]} />;

function App(props) {
  return (
    <SliderRail
      {...props}
      sx={[
        props.variant === 'secondary'
          ? { color: props.isRed ? 'red' : 'blue' }
          : { backgroundColor: 'blue', color: 'white' },
        (theme) => ({
          border: `1px solid ${theme.palette.primary.main}`,
        }),
      ]}
    />
  );
}

function App2(props) {
  return (
    <SliderRail
      sx={[
        { color: 'green' },
        props.variant === 'secondary' && { color: props.isRed ? 'red' : 'blue' },
      ]}
      className={`foo ${props.className}`}
      style={{
        color: 'red',
        ...props.style,
      }}
    />
  );
}

_jsx('div', {
  sx: [
    {
      opacity: 1,
    },
  ],
});

_jsx('div', {
  className: 'foo',
  style: {
    opacity: 1,
  },
  sx: [
    {
      color: 'red',
    },
    {
      color: 'green',
    },
  ],
});

function App3(props) {
  return _jsx('div', {
    sx: [
      (theme) => ({
        border: `1px solid ${theme.palette.primary.main}`,
      }),
      props.disabled
        ? {
            opacity: 0.4,
          }
        : {
            color: 'red',
          },
    ],
    children: 'test',
    ...props,
  });
}

function App4(props) {
  return _jsx('div', {
    sx: [
      (theme) => ({
        border: `1px solid ${theme.palette.primary.main}`,
      }),
      props.variant === 'secondary' && { color: props.isRed ? 'red' : 'blue' },
    ],
    className: `foo ${props.className}`,
    style: {
      color: 'red',
      ...props.style,
    },
  });
}
