/**
 * Copied over fom material-ui/packages/mui-material/src/styles/createTransitions.js
 */

export interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}

export interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}

export interface TransitionsOptions {
  easing?: Partial<Easing>;
  duration?: Partial<Duration>;
  create?: (
    props: string | string[],
    options?: Partial<{ duration: number | string; easing: string; delay: number | string }>,
  ) => string;
  getAutoHeightDuration?: (height: number) => number;
}

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easing: Easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

// Follow https://m2.material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export const duration: Duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface Transitions extends WithRequired<TransitionsOptions, 'create'> {
  easing: Easing;
  duration: Duration;
  getAutoHeightDuration: typeof getAutoHeightDuration;
}

function formatMs(milliseconds: number) {
  return `${Math.round(milliseconds)}ms`;
}

/**
 * @internal
 * @param height
 */
function getAutoHeightDuration(height: number) {
  if (!height) {
    return 0;
  }

  const constant = height / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export default function createTransitions(inputTransitions: TransitionsOptions): Transitions {
  const mergedEasing = {
    ...easing,
    ...inputTransitions.easing,
  };

  const mergedDuration = {
    ...duration,
    ...inputTransitions.duration,
  };

  const create: TransitionsOptions['create'] = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options;

    if (process.env.NODE_ENV !== 'production') {
      const isString = (value: unknown): value is string => typeof value === 'string';
      const isNumber = (value: number | string): value is number =>
        typeof value === 'number' || !Number.isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }

      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(
          `MUI: Argument "duration" must be a number or a string but found ${durationOption}.`,
        );
      }

      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }

      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }

      if (typeof options !== 'object') {
        console.error(
          [
            'MUI: Secong argument of transition.create must be an object.',
            "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`",
          ].join('\n'),
        );
      }

      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
      }
    }

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${
            typeof durationOption === 'string' ? durationOption : formatMs(durationOption)
          } ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`,
      )
      .join(',');
  };

  return {
    getAutoHeightDuration,
    create,
    ...inputTransitions,
    easing: mergedEasing,
    duration: mergedDuration,
  };
}
