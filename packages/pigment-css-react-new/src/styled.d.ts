import type * as React from 'react';
import { Variants, BaseInterface, CssArg, VariantNames, Primitive } from '@pigment-css/core';

export type NoInfer<T> = [T][T extends any ? 0 : never];
type FastOmit<T extends object, U extends string | number | symbol> = {
  [K in keyof T as K extends U ? never : K]: T[K];
};

export type Substitute<A extends object, B extends object> = FastOmit<A, keyof B> & B;

interface RequiredProps {
  className?: string;
  style?: React.CSSProperties;
}

export type PolymorphicComponentProps<
  Props extends {},
  AsTarget extends React.ElementType | undefined,
  AsTargetProps extends object = AsTarget extends React.ElementType
    ? React.ComponentPropsWithRef<AsTarget>
    : {},
> = NoInfer<Omit<Substitute<Props, AsTargetProps>, 'as'>> & {
  as?: AsTarget;
  children?: React.ReactNode;
};

export interface PolymorphicComponent<Props extends {}>
  extends React.ForwardRefExoticComponent<Props> {
  <AsTarget extends React.ElementType | undefined = undefined>(
    props: PolymorphicComponentProps<Props, AsTarget>,
  ): React.JSX.Element;
}

type StyledArgument<V extends Variants> = CssArg<V>;

interface StyledComponent<Props extends {}> extends PolymorphicComponent<Props> {
  defaultProps?: Partial<Props> | undefined;
  toString: () => string;
}

interface StyledOptions extends BaseInterface {}

export interface CreateStyledComponent<
  Component extends React.ElementType,
  OuterProps extends object,
> {
  <Props extends {} = {}>(
    arg: TemplateStringsArray,
    ...templateArgs: (StyledComponent<any> | Primitive | ((props: Props) => Primitive))[]
  ): StyledComponent<Substitute<OuterProps, Props>> & (Component extends string ? {} : Component);

  <V extends {}>(
    ...styles: Array<StyledArgument<V>>
  ): StyledComponent<Substitute<OuterProps, V extends Variants ? VariantNames<V> : V>> &
    (Component extends string ? {} : Component);
}

export interface CreateStyled {
  <
    TagOrComponent extends React.ElementType,
    FinalProps extends {} = React.ComponentPropsWithRef<TagOrComponent>,
  >(
    tag: TagOrComponent,
    options?: StyledOptions,
  ): CreateStyledComponent<TagOrComponent, FinalProps>;
}

export type CreateStyledIndex = {
  [Key in keyof React.JSX.IntrinsicElements]: CreateStyledComponent<
    Key,
    React.JSX.IntrinsicElements[Key]
  >;
};

export declare const styled: CreateStyled & CreateStyledIndex;
