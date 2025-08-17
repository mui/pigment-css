/**
 * This is a pre-transformed file for testing.
 */
import { _ as _tagged_template_literal } from '@swc/helpers/_/_tagged_template_literal';
import { styled, keyframes } from '@pigment-css/react-new';

function _templateObject() {
  const data = _tagged_template_literal([
    '\n  0% {\n    transform: scale(0);\n    opacity: 0.1;\n  }\n\n  100% {\n    transform: scale(1);\n    opacity: 0.3;\n  }\n',
  ]);
  _templateObject = function () {
    return data;
  };
  return data;
}
function _templateObject1() {
  const data = _tagged_template_literal([
    '\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n',
  ]);
  _templateObject1 = function () {
    return data;
  };
  return data;
}
function _templateObject2() {
  const data = _tagged_template_literal([
    '\n  0% {\n    transform: scale(1);\n  }\n\n  50% {\n    transform: scale(0.92);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n',
  ]);
  _templateObject2 = function () {
    return data;
  };
  return data;
}
function _templateObject3() {
  const data = _tagged_template_literal([
    '\n  opacity: 0;\n  position: absolute;\n\n  &.',
    ' {\n    opacity: 0.3;\n    transform: scale(1);\n    animation-name: ',
    ';\n    animation-duration: ',
    'ms;\n    animation-timing-function: ',
    ';\n  }\n\n  &.',
    ' {\n    animation-duration: ',
    'ms;\n  }\n\n  & .',
    ' {\n    opacity: 1;\n    display: block;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: currentColor;\n  }\n\n  & .',
    ' {\n    opacity: 0;\n    animation-name: ',
    ';\n    animation-duration: ',
    'ms;\n    animation-timing-function: ',
    ';\n  }\n\n  & .',
    ' {\n    position: absolute;\n    /* @noflip */\n    left: 0px;\n    top: 0;\n    animation-name: ',
    ';\n    animation-duration: 2500ms;\n    animation-timing-function: ',
    ';\n    animation-iteration-count: infinite;\n    animation-delay: 200ms;\n  }\n',
  ]);
  _templateObject3 = function () {
    return data;
  };
  return data;
}

const touchRippleClasses = {
  rippleVisible: 'MuiTouchRipple.rippleVisible',
  ripplePulsate: 'MuiTouchRipple.ripplePulsate',
  child: 'MuiTouchRipple.child',
  childLeaving: 'MuiTouchRipple.childLeaving',
  childPulsate: 'MuiTouchRipple.childPulsate',
};

const enterKeyframe = keyframes(_templateObject());
const exitKeyframe = keyframes(_templateObject1());
const pulsateKeyframe = keyframes(_templateObject2());

export const TouchRippleRoot = styled('span', {
  name: 'MuiTouchRipple',
  slot: 'Root',
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
});

// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
export const TouchRippleRipple = styled(Ripple, {
  name: 'MuiTouchRipple',
  slot: 'Ripple',
})(
  _templateObject3(),
  touchRippleClasses.rippleVisible,
  enterKeyframe,
  DURATION,
  (param) => {
    let { theme } = param;
    return theme.transitions.easing.easeInOut;
  },
  touchRippleClasses.ripplePulsate,
  (param) => {
    let { theme } = param;
    return theme.transitions.duration.shorter;
  },
  touchRippleClasses.child,
  touchRippleClasses.childLeaving,
  exitKeyframe,
  DURATION,
  (param) => {
    let { theme } = param;
    return theme.transitions.easing.easeInOut;
  },
  touchRippleClasses.childPulsate,
  pulsateKeyframe,
  (param) => {
    let { theme } = param;
    return theme.transitions.easing.easeInOut;
  },
);
