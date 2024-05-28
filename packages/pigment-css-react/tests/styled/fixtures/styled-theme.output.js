import { styled as _styled, styled as _styled2, styled as _styled3 } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
import PropTypes from 'prop-types';
const Component = /*#__PURE__*/ _styled('div')({
  classes: ['cemfduf'],
});
const SliderRail = /*#__PURE__*/ _styled2('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['s7fgwgo', 's7fgwgo-1'],
});
const SliderRail2 = /*#__PURE__*/ _styled3('span')({
  classes: ['s10rodt2'],
});
export function App() {
  return (
    <Component>
      <SliderRail />
      <SliderRail2 />
    </Component>
  );
}
process.env.NODE_ENV !== 'production'
  ? (App.propTypes = {
      children: PropTypes.element,
    })
  : void 0;
process.env.NODE_ENV !== 'production' ? (App.muiName = 'App') : void 0;
