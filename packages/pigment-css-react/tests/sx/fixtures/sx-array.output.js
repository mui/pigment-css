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
<div {..._sx(['dnf03uj'], {})} />;
<div
  className="foo"
  style={{
    opacity: 1,
  }}
  {..._sx2(['dsvwfmp', 'd121rcfp'], {
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
                className: 'schfkcb',
                vars: {
                  'schfkcb-0': [props.isRed ? 'red' : 'blue', false],
                },
              }
            : 's1cp79ho',
          'soyt4ij',
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
          'sr48wd1',
          props.variant === 'secondary' && {
            className: 's6s70bv',
            vars: {
              's6s70bv-0': [props.isRed ? 'red' : 'blue', false],
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
  ..._sx5(['s1v8upwb'], {}),
});
_jsx('div', {
  className: 'foo',
  style: {
    opacity: 1,
  },
  ..._sx6(['sjtfjpx', 's1r80n7h'], {
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
    ..._sx7(['s1gu7ed8', props.disabled ? 's1h4vmh2' : 's1oy2sl1'], {
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
        's14d8kn5',
        props.variant === 'secondary' && {
          className: 's1su4mia',
          vars: {
            's1su4mia-0': [props.isRed ? 'red' : 'blue', false],
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
