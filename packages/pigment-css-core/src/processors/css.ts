/**
 * This processor for `css` calls handles a lot of the scenarios.
 * There is `CssProcessor` which is actually called by wyw. In its
 * initialization, it checks for the type of parameters and depending
 * on whether any one of the params is a template type, it
 * internally creates `CssTaggedTemplateProcessor` or `CssObjectProcessor`
 * if the css is called with object values.
 * These both processors internally handle their own relevant logic.
 * They implement a common interface which is what is called by the main
 * CssProcessor.
 */

import { SourceLocation, TemplateElement } from '@babel/types';
import {
  type TransformedInternalConfig,
  type StyleObjectReturn,
  type ClassNameOptions,
  BaseProcessor,
  parseArray,
  processStyleObjects,
  serializeStyles,
  valueToLiteral,
  evaluateClassNameArg,
  transformProbableCssVar,
} from '@pigment-css/utils';
import {
  CallParam,
  type Expression,
  type Params,
  type TailProcessorParams,
  TemplateParam,
  type ValueCache,
  validateParams,
} from '@wyw-in-js/processor-utils';
import {
  Artifact,
  ExpressionValue,
  FunctionValue,
  LazyValue,
  Replacements,
  Rules,
  ValueType,
} from '@wyw-in-js/shared';
import { ThemeArgs } from '../base';
import { BaseInterface } from '../css';

export type Primitive = string | number | boolean | null | undefined;
export type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

export abstract class BaseCssProcessor {
  public variants: { $$cls: string; props: Record<string, string | number> }[] = [];

  public defaultVariants: Record<string, unknown> = {};

  public variables: StyleObjectReturn['variables'] = {};

  readonly artifacts: Artifact[] = [];

  readonly classNames: string[] = [];

  public staticClass: BaseInterface | null = null;

  constructor(
    public readonly params: Params,
    public readonly slugClass: string,
    public readonly wrapStyle: (style: string, selector: string) => string,
    public readonly tagSource: TailProcessorParams[0],
    public readonly astService: TailProcessorParams[1],
    public readonly location: TailProcessorParams[2],
    public readonly replacer: TailProcessorParams[3],
    public readonly displayName: TailProcessorParams[4],
    public readonly isReferenced: TailProcessorParams[5],
    public readonly idx: TailProcessorParams[6],
    public readonly options: TailProcessorParams[7],
    public readonly context: TailProcessorParams[8],
  ) {}

  abstract getDependencies(): ExpressionValue[];

  abstract build(values: ValueCache): void;

  doEvaltimeReplacement(): void {
    this.replacer(this.astService.stringLiteral(this.getBaseClass()), false);
  }

  doRuntimeReplacement() {
    this.replacer(this.astService.stringLiteral(this.classNames.join(' ')), false);
  }

  getBaseClass() {
    if (this.staticClass?.className) {
      if (typeof this.staticClass.className === 'string') {
        return this.staticClass.className;
      }
      return this.staticClass.className();
    }
    return this.slugClass;
  }

  getClassName(opts?: ClassNameOptions): string {
    const baseClass = this.getBaseClass();
    if (!opts) {
      return baseClass;
    }
    if ('variantName' in opts) {
      return typeof this.staticClass?.className === 'function'
        ? this.staticClass.className(opts)
        : `${baseClass}-${opts.variantName}-${opts.variantValue}`;
    }
    if ('isCv' in opts) {
      return `${baseClass}-cv`;
    }
    return baseClass;
  }
}

type BaseCssProcessorConstructorParams = ConstructorParameters<typeof BaseCssProcessor>;
export type CssTailProcessorParams = BaseCssProcessorConstructorParams extends [Params, ...infer T]
  ? T
  : never;

function handleTemplateElementOrSimilar(
  templateParams: (TemplateElement | ExpressionValue)[],
  values: ValueCache,
  processor: BaseCssProcessor,
) {
  const { themeArgs = {}, pigmentFeatures: { useLayer = true } = {} } =
    processor.options as TransformedInternalConfig;
  // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
  const templateStrs: string[] = [];
  // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
  templateStrs.raw = [];
  const templateExpressions: Primitive[] = [];
  let paramsToIterate = templateParams;
  const [firstArg, ...restArgs] = templateParams;
  if ('kind' in firstArg && firstArg.kind === ValueType.LAZY) {
    const value = values.get(firstArg.ex.name) as string[];
    templateStrs.push(...value);
    // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
    templateStrs.raw.push(...value);
    paramsToIterate = restArgs;
  }
  paramsToIterate.forEach((param) => {
    if ('kind' in param) {
      switch (param.kind) {
        case ValueType.FUNCTION: {
          const value = values.get(param.ex.name) as TemplateCallback;
          templateExpressions.push(value(themeArgs));
          break;
        }
        case ValueType.CONST: {
          if (typeof param.value === 'string') {
            templateExpressions.push(transformProbableCssVar(param.value));
          } else {
            templateExpressions.push(param.value);
          }
          break;
        }
        case ValueType.LAZY: {
          const evaluatedValue = values.get(param.ex.name);
          if (typeof evaluatedValue === 'function') {
            templateExpressions.push(evaluatedValue(themeArgs));
          } else if (typeof evaluatedValue === 'string') {
            templateExpressions.push(transformProbableCssVar(evaluatedValue));
          } else {
            templateExpressions.push(evaluatedValue as Primitive);
          }
          break;
        }
        default:
          break;
      }
    } else if ('type' in param && param.type === 'TemplateElement') {
      templateStrs.push(param.value.cooked as string);
      // @ts-ignore
      templateStrs.raw.push(param.value.raw);
    }
  });
  const { styles } = serializeStyles(
    templateExpressions.length > 0 ? [templateStrs, ...templateExpressions] : [templateStrs],
  );

  const cssText = useLayer
    ? `@layer pigment.base{${processor.wrapStyle(styles, '')}}`
    : processor.wrapStyle(styles, '');
  const className = processor.getClassName();
  const rules: Rules = {
    [`.${className}`]: {
      className,
      cssText,
      displayName: processor.displayName,
      start: processor.location?.start ?? null,
    },
  };
  const location = processor.location;
  const sourceMapReplacements: Replacements = [
    {
      length: cssText.length,
      original: {
        start: {
          column: location?.start.column ?? 0,
          line: location?.start.line ?? 0,
        },
        end: {
          column: location?.end.column ?? 0,
          line: location?.end.line ?? 0,
        },
      },
    },
  ];
  processor.classNames.push(className);
  processor.artifacts.push(['css', [rules, sourceMapReplacements]]);
}

/**
 * Only deals with css`` or css(metadata)`` calls.
 */
export class CssTaggedTemplateProcessor extends BaseCssProcessor {
  templateParam: TemplateParam;

  constructor(params: [TemplateParam], ...args: CssTailProcessorParams) {
    super(params, ...args);
    this.templateParam = params[0];
  }

  getDependencies(): ExpressionValue[] {
    const [, elementOrExpression] = this.templateParam;
    return elementOrExpression.filter(
      (arg): arg is ExpressionValue => 'kind' in arg && arg.kind !== ValueType.CONST,
    );
  }

  build(values: ValueCache): void {
    const [, templateParams] = this.templateParam;
    handleTemplateElementOrSimilar(templateParams, values, this);
  }
}

/**
 * Only deals with css(...styleObjects) or or css(styleObject) css(metadata, [...styleObjects]) calls.
 */
export class CssObjectProcessor extends BaseCssProcessor {
  callParam: CallParam;

  constructor(params: [CallParam], ...args: CssTailProcessorParams) {
    super(params, ...args);
    this.callParam = params[0];
  }

  getDependencies(): ExpressionValue[] {
    const [, ...params] = this.callParam;
    return params.flat().filter((param) => 'kind' in param);
  }

  isMaybeTransformedTemplateLiteral(values: ValueCache): boolean {
    const [, firstArg, ...restArgs] = this.callParam;
    if (!('kind' in firstArg) || firstArg.kind === ValueType.CONST) {
      return false;
    }
    const firstArgVal = values.get(firstArg.ex.name);
    if (Array.isArray(firstArgVal) && restArgs.length === firstArgVal.length - 1) {
      return true;
    }
    return false;
  }

  private buildForTransformedTemplateTag(values: ValueCache) {
    const [, ...templateParams] = this.callParam;
    handleTemplateElementOrSimilar(templateParams, values, this);
  }

  build(values: ValueCache): void {
    if (this.isMaybeTransformedTemplateLiteral(values)) {
      this.buildForTransformedTemplateTag(values);
      return;
    }
    const [, ...callParams] = this.callParam;
    const { themeArgs, pigmentFeatures: { useLayer = true } = {} } = this
      .options as TransformedInternalConfig;

    const evaluatedValues = (callParams as (LazyValue | FunctionValue)[]).map((param) =>
      values.get(param.ex.name),
    );
    let stylesList: (object | Function)[];
    // let metadata: any;
    // check for css(metadata, [styles]) or css(metadata, style) call
    const locations: (SourceLocation | null | undefined)[] = [];
    if (
      evaluatedValues.length === 2 &&
      evaluatedValues[0] &&
      typeof evaluatedValues[0] === 'object' &&
      'className' in evaluatedValues[0]
    ) {
      // metadata = evaluatedValues[0];
      const param = callParams[1] as LazyValue | FunctionValue;
      if (Array.isArray(evaluatedValues[1])) {
        stylesList = evaluatedValues[1];
        // Parse the expression AST to track the exact locations of each parameter
        const arrayItemsAst = parseArray((callParams[1] as ExpressionValue).source, {
          startLine: param.ex.loc?.start.line,
          startIndex: param.ex.loc?.start.index,
          startColumn: param.ex.loc?.start.column,
        });
        if (arrayItemsAst) {
          locations.push(...arrayItemsAst.elements.map((item) => item?.loc));
        }
      } else {
        stylesList = [evaluatedValues[1] as (typeof stylesList)[number]];
        locations.push((callParams[1] as unknown as ExpressionValue).ex.loc);
      }
    } else {
      // This is for css(...styles) call
      stylesList = evaluatedValues as typeof stylesList;
      locations.push(...(callParams as ExpressionValue[]).map((p) => p.ex.loc));
    }

    const styles = stylesList.map((item) =>
      typeof item === 'function' ? item(themeArgs as unknown as ThemeArgs) : item,
    );
    let count = 0;
    const result = processStyleObjects(styles, {
      getClassName: (opts?: ClassNameOptions) => {
        return this.getClassName(opts);
      },
      getVariableName: () => {
        count += 1;
        return `${this.getClassName()}-${count}`;
      },
    });

    const addStyles = (s: StyleObjectReturn[], layer?: string) => {
      const rules: Rules = {};
      s.forEach((style, index) => {
        const location = locations[index] ?? locations[0];
        const cssText =
          layer && useLayer
            ? `@layer pigment.${layer} {${this.wrapStyle(style.cssText, '')}}`
            : this.wrapStyle(style.cssText, '');
        rules[`.${style.className}`] = {
          className: style.className,
          cssText,
          displayName: this.displayName,
          start: location?.start ?? null,
        };

        const sourceMapReplacements: Replacements =
          layer === 'base'
            ? [
                {
                  length: cssText.length,
                  original: {
                    start: {
                      column: location?.start.column ?? 0,
                      line: location?.start.line ?? 0,
                    },
                    end: {
                      column: location?.end.column ?? 0,
                      line: location?.end.line ?? 0,
                    },
                  },
                },
              ]
            : [];

        if (Object.keys(style.serializables).length > 0) {
          this.variants.push({
            $$cls: style.className,
            props: style.serializables,
          });
        }

        this.variables = {
          ...this.variables,
          ...style.variables,
        };
        this.artifacts.push(['css', [rules, sourceMapReplacements]]);
      });
    };
    this.classNames.push(...result.base.map((item) => item.className));
    addStyles(result.base, 'base');
    addStyles(result.variants, 'variants');
    addStyles(result.compoundVariants, 'compoundvariants');
    this.defaultVariants = result.defaultVariants;
  }
}

/**
 * Scoped css class generation similar to css from emotion.
 *
 * @example
 * ```ts
 * import { css } from '@pigment-css/react';
 *
 * const class1 = css(({theme}) => ({
 *  color: (theme.vars || theme).palette.primary.main,
 * }))
 * ```
 *
 * <html className={class1} />
 */
export class CssProcessor extends BaseProcessor {
  processor: BaseCssProcessor;

  // eslint-disable-next-line class-methods-use-this
  get packageName() {
    return process.env.PACKAGE_NAME as string;
  }

  basePath = `${this.packageName}/runtime`;

  // eslint-disable-next-line class-methods-use-this
  wrapStyle(style: string) {
    return style;
  }

  get asSelector(): string {
    return this.processor.getBaseClass();
  }

  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);

    validateParams(params, ['callee', '...'], BaseProcessor.SKIP);

    const wrapStyle = this.wrapStyle.bind(this);
    if (params.length === 2) {
      validateParams(
        params,
        ['callee', ['call', 'template']],
        `${this.packageName}: Invalid use of ${this.tagSource.imported} function.`,
      );
      const [, callOrTemplate] = params;
      if (callOrTemplate[0] === 'template') {
        this.processor = new CssTaggedTemplateProcessor(
          [callOrTemplate],
          this.className,
          wrapStyle,
          ...args,
        );
      } else {
        this.processor = new CssObjectProcessor(
          [callOrTemplate],
          this.className,
          wrapStyle,
          ...args,
        );
      }
    } else if (params.length === 3) {
      validateParams(
        params,
        ['callee', ['call'], ['call', 'template']],
        `${this.packageName}: Invalid use of ${this.tagSource.imported} function.`,
      );

      const [, [, callOpt], callOrTemplate] = params;
      if (callOrTemplate[0] === 'template') {
        this.processor = new CssTaggedTemplateProcessor(
          [callOrTemplate],
          this.className,
          wrapStyle,
          ...args,
        );
      } else {
        this.processor = new CssObjectProcessor(
          [callOrTemplate],
          this.className,
          wrapStyle,
          ...args,
        );
      }
      this.processor.staticClass = evaluateClassNameArg(callOpt.source) as BaseInterface;
    } else {
      throw new Error(
        `${this.packageName}: Invalid call to "${this.tagSource.imported}" function.`,
      );
    }

    this.dependencies.push(...this.processor.getDependencies());
  }

  build(values: ValueCache) {
    this.processor.build(values);
    this.artifacts.push(...this.processor.artifacts);
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.processor.getBaseClass());
  }

  doEvaltimeReplacement(): void {
    this.replacer(this.value, false);
  }

  getStyleArgs() {
    const t = this.astService;
    const baseClasses = t.stringLiteral(this.processor.classNames.join(' '));
    const args = t.objectExpression([t.objectProperty(t.identifier('classes'), baseClasses)]);
    if (this.processor.variants.length > 0) {
      args.properties.push(
        t.objectProperty(
          t.identifier('variants'),
          valueToLiteral(this.processor.variants), // , callParams[1] as ExpressionValue),
        ),
      );
    }
    if (Object.keys(this.processor.defaultVariants).length > 0) {
      args.properties.push(
        t.objectProperty(
          t.identifier('defaultVariants'),
          valueToLiteral(this.processor.defaultVariants),
        ),
      );
    }
    if (Object.keys(this.processor.variables).length > 0) {
      args.properties.push(
        t.objectProperty(t.identifier('vars'), valueToLiteral(this.processor.variables)),
      );
    }
    return args;
  }

  getImportPath() {
    const { runtimeReplacementPath } = this.options as TransformedInternalConfig;
    const importPath =
      runtimeReplacementPath?.(this.tagSource.imported, this.tagSource.source) ?? this.basePath;
    return importPath;
  }

  createReplacement() {
    const t = this.astService;
    const callId = t.addNamedImport('css', this.getImportPath());
    return t.callExpression(callId, [this.getStyleArgs()]);
  }

  doRuntimeReplacement(): void {
    this.replacer(this.createReplacement(), true);
  }
}
