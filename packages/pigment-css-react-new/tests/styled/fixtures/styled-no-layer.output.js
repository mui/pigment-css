import {
  styled as _styled,
  styled as _styled2,
  styled as _styled3,
  styled as _styled4,
  styled as _styled5,
  styled as _styled6,
  styled as _styled7,
} from '@pigment-css/react-new/runtime';
function TestComponent() {
  return <h1>Hello</h1>;
}
const _exp2 = /*#__PURE__*/ () => TestComponent;
const StyledTest = /*#__PURE__*/ _styled(_exp2())({
  classes: 's1k22dj',
  variants: [
    {
      $$cls: 's1k22dj-size-small',
      props: {
        size: 'small',
      },
    },
    {
      $$cls: 's1k22dj-size-medium',
      props: {
        size: 'medium',
      },
    },
    {
      $$cls: 's1k22dj-size-large',
      props: {
        size: 'large',
      },
    },
  ],
  vars: {
    '--s1k22dj-1': [
      (props) => {
        return props.size === 'small' ? 'red' : 'blue';
      },
      0,
    ],
  },
});
export const SliderRail3 = /*#__PURE__*/ _styled2('span')({
  classes: 'scx6lci',
});
export const SliderRail = /*#__PURE__*/ _styled3('span')({
  classes: 's1uutepx',
});
const SliderRail5 = /*#__PURE__*/ _styled4('span')({
  classes: 's1czomkm',
});
const Component = /*#__PURE__*/ _styled5('div')({
  classes: 'camj2o9',
});
const SliderRail2 = /*#__PURE__*/ _styled6('span')({
  classes: 's9jspa8',
});
const SliderRail4 = /*#__PURE__*/ _styled7('span')({
  classes: 'sg47azp',
});
export function App() {
  return (
    <Component>
      <SliderRail />
      <SliderRail2 />
    </Component>
  );
}
