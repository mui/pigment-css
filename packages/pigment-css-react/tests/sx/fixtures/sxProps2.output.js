import { sx as _sx, sx as _sx2, sx as _sx3, styled as _styled } from '@pigment-css/react';
const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['sdbmcs3', 'sdbmcs3-1'],
});
const A = {
  SliderRail,
};
function App(props) {
  return <SliderRail {..._sx('si7ulc4', {})} />;
}
function App2() {
  return (
    <SliderRail
      component="li"
      {...props}
      {..._sx2('sliig2s', {
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
          className: 'so956n',
          vars: {
            'so956n-0': [props.isRed ? 'h1-fontSize' : 'h2-fontSize', false],
          },
        },
        {},
      )}
    />
  );
}
