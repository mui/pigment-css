import {
  sx as _sx,
  sx as _sx2,
  sx as _sx3,
  sx as _sx4,
  sx as _sx5,
  sx as _sx6,
  sx as _sx7,
  sx as _sx8,
} from '@pigment-css/react';
import { jsx as _jsx } from 'react/jsx-runtime';
<div {..._sx(['d77f2qa'], {})} />;
<div
  className="foo"
  style={{
    opacity: 1,
  }}
  {..._sx2(['d7xe34b', 'd1c7ydi9'], {
    className: 'foo',
    style: {
      opacity: 1,
    },
  })}
/>;
function App(props) {
  return (
    <SliderRail
      {...props}
      {..._sx3(
        [
          props.variant === 'secondary'
            ? {
                className: 's1f8s81x',
                vars: {
                  's1f8s81x-0': [props.isRed ? 'red' : 'blue', false],
                },
              }
            : 'svfluak',
          'sv5tf3c',
        ],
        {
          ...props,
        },
      )}
    />
  );
}
function App2(props) {
  return (
    <SliderRail
      className={`foo ${props.className}`}
      style={{
        color: 'red',
        ...props.style,
      }}
      {..._sx4(
        [
          's5gn2mm',
          props.variant === 'secondary' && {
            className: 's150l9nl',
            vars: {
              's150l9nl-0': [props.isRed ? 'red' : 'blue', false],
            },
          },
        ],
        {
          className: `foo ${props.className}`,
          style: {
            color: 'red',
            ...props.style,
          },
        },
      )}
    />
  );
}
_jsx('div', {
  ..._sx5(['sh10a0'], {}),
});
_jsx('div', {
  className: 'foo',
  style: {
    opacity: 1,
  },
  ..._sx6(['sylg5x2', 's96muxz'], {
    className: 'foo',
    style: {
      opacity: 1,
    },
  }),
});
function App3(props) {
  return _jsx('div', {
    children: 'test',
    ...props,
    ..._sx7(['s1g57qnj', props.disabled ? 's1k5bcbo' : 'so7h5fe'], {
      ...props,
    }),
  });
}
function App4(props) {
  return _jsx('div', {
    className: `foo ${props.className}`,
    style: {
      color: 'red',
      ...props.style,
    },
    ..._sx8(
      [
        's1feokgc',
        props.variant === 'secondary' && {
          className: 's1vdrnlm',
          vars: {
            's1vdrnlm-0': [props.isRed ? 'red' : 'blue', false],
          },
        },
      ],
      {
        className: `foo ${props.className}`,
        style: {
          color: 'red',
          ...props.style,
        },
      },
    ),
  });
}
