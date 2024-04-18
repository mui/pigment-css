import type { BaseDefaultProps, Substitute, NoInfer } from './base';
import type { SxProp } from './sx';

export type PolymorphicComponentProps<
  BaseProps extends object,
  AsTarget extends React.ElementType | undefined,
  AsTargetProps extends object = AsTarget extends React.ElementType
    ? React.ComponentPropsWithRef<AsTarget>
    : BaseDefaultProps,
> = NoInfer<Omit<Substitute<BaseProps, AsTargetProps>, 'as' | 'component'>> & {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * Replacement for the emotion's `as` prop.
   */
  as?: AsTarget;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: AsTarget;
  /**
   * The style extension prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
};

export interface PolymorphicComponent<BaseProps extends BaseDefaultProps>
  extends React.ForwardRefExoticComponent<BaseProps> {
  <AsTarget extends React.ElementType | undefined = undefined>(
    props: PolymorphicComponentProps<BaseProps, AsTarget>,
  ): JSX.Element;
}

declare const Box: PolymorphicComponent<{}>;

export default Box;
