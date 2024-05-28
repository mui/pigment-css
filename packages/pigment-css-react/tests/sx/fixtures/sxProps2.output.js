import { sx as _sx, sx as _sx2, sx as _sx3, styled as _styled } from '@pigment-css/react';
const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['syo8irh', 'syo8irh-1'],
});
const A = {
  SliderRail,
};
function App(props) {
  return <SliderRail {..._sx('s1g6t5jc', {})} />;
}
function App2() {
  return (
    <SliderRail
      component="li"
      {...props}
      {..._sx2('ska13jz', {
        ...props,
      })}
    />
  );
}
function App3(props) {
  return (
    <A.SliderRail
      {..._sx3(
        {
          className: 's17in6il',
          vars: {
            's17in6il-0': [props.isRed ? 'h1-fontSize' : 'h2-fontSize', false],
          },
        },
        {},
      )}
    />
  );
}
