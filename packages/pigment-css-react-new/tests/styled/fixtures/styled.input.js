import { styled, keyframes, css } from '@pigment-css/react-new';
import { TestComponent } from './dummy-component.fixture';

const cls1 = css({
  color: 'red',
});

export const rotateKeyframe = keyframes({ className: 'rotate' })({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const StyledTest = styled(TestComponent, {
  className: 'StyledTest',
})({
  $$id: 0,
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  [`.${cls1}`]: {
    color: 'blue',
  },
  color(props) {
    return props.size === 'small' ? 'red' : 'blue';
  },
  variants: {
    size: {
      small: {
        $$id: '01',
        padding: 0,
        margin: 0,
        borderColor: 'red',
      },
      medium: {
        $$id: '02',
        padding: 5,
      },
      large: {
        $$id: '03',
        padding: 10,
      },
    },
  },
});

export const SliderRail3 = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  $$id: 1,
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
});

export const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  ---id: 2;
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
`;

const SliderRail5 = styled.span({
  display: 'block',
  opacity: 0.38,
  [SliderRail]: {
    display: 'none',
  },
});

const Component = styled.div({
  $$id: 3,
  color: '#ff5252',
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
});

const SliderRail2 = styled('span')`
  ---id: 4;
  display: block;
  opacity: 0.38;
  ${SliderRail} {
    display: none;
  }
`;

const SliderRail4 = styled.span`
  ---id: 5;
  display: block;
  opacity: 0.38;
  ${SliderRail} {
    display: none;
  }
`;

export function App() {
  return (
    <Component>
      <SliderRail />
      <SliderRail2 />
    </Component>
  );
}
