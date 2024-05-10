import {
  sx as _sx,
  sx as _sx2,
  sx as _sx3,
  sx as _sx4,
  sx as _sx5,
  sx as _sx6,
  styled as _styled,
} from '@pigment-css/react';
export const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['s18b79se', 's18b79se-1'],
});
function App(props) {
  return (
    <SliderRail
      className={props.className}
      style={{
        color: 'red',
      }}
      {..._sx('s6m0ihh', {
        className: props.className,
        style: {
          color: 'red',
        },
      })}
    />
  );
}
function App2(props) {
  return (
    <SliderRail
      {...props}
      {...(props.variant === 'secondary'
        ? _sx2(
            {
              className: 's1kwvbjk',
              vars: {
                's1kwvbjk-0': [props.isRed ? 'red' : 'blue', false],
              },
            },
            {
              ...props,
            },
          )
        : _sx2('s1cp99fn', {
            ...props,
          }))}
    />
  );
}
function App3(props) {
  return (
    <SliderRail
      className={`foo ${props.className}`}
      style={{
        color: 'red',
        ...props.style,
      }}
      {...(props.variant === 'secondary' &&
        _sx3(
          {
            className: 's1w3gk0m',
            vars: {
              's1w3gk0m-0': [props.isRed ? 'red' : 'blue', false],
            },
          },
          {
            className: `foo ${props.className}`,
            style: {
              color: 'red',
              ...props.style,
            },
          },
        ))}
    />
  );
}
function App4(props) {
  return <SliderRail {..._sx4('s399llo', {})} />;
}
function App5(props) {
  return <SliderRail {..._sx5('s1t8z5o6', {})} />;
}
function App6(props) {
  return <SliderRail {..._sx6('s1f34qq2', {})} />;
}
