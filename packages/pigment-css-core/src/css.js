import { generateErrorMessage } from './utils';

export default function css() {
  console.error(generateErrorMessage('css'));
}

/**
const cls1 = css({
  className() {
    return 'class-name',
  },
})<Props>({
  color: 'red',
  backgroundColor: (props) => props.isRed ? 'red' : 'blue',
  variants: {
    size: {
      small: {
        padding: 2,
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {},
});

const {className, style} = cls1({
  isRed: true,
  size: 'small',
});
 */
