import { Breakpoint } from './base';
import { PolymorphicComponent } from './Box';

type HiddenUp = {
  [key in Breakpoint as `${key}Up`]?: boolean;
};
type HiddenDown = {
  [key in Breakpoint as `${key}Down`]?: boolean;
};

interface HiddenBaseProps extends HiddenUp, HiddenDown {
  className?: string;
  only?: Breakpoint | Breakpoint[];
}

declare const Hidden: PolymorphicComponent<
  HiddenBaseProps & React.DetailsHTMLAttributes<HTMLDivElement>
>;

export default Hidden;
