import {
  sx as _sx,
  sx as _sx2,
  sx as _sx3,
  sx as _sx4,
  styled as _styled,
} from '@pigment-css/react';
export const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['sjfloo5', 'sjfloo5-1'],
});
function App(props) {
  return (
    <SliderRail
      className={props.className}
      style={{
        color: 'red',
      }}
      {..._sx('s1o8xp19', {
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
              className: 's1xbsywq',
              vars: {
                's1xbsywq-0': [props.isRed ? 'red' : 'blue', false],
              },
            },
            {
              ...props,
            },
          )
        : _sx2('s1wnk6s5', {
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
            className: 'stzaibv',
            vars: {
              'stzaibv-0': [props.isRed ? 'red' : 'blue', false],
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
  return <SliderRail {..._sx4('sazg8ol', {})} />;
}
