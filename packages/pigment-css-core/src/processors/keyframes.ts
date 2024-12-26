/**
 * This processor for `keyframes` calls handles a lot of the scenarios.
 * There is `KeyframesProcessor` which is actually called by wyw. In its
 * initialization, it checks for the type of parameters and depending
 * on whether any one of the params is a template type, it
 * internally creates `KeyframesTaggedTemplateProcessor` or `KeyframesObjectProcessor`
 * if the css is called with object values.
 * These both processors internally handle their own relevant logic.
 * They implement a common interface which is what is called by the main
 * KeyframesProcessor.
 */

import { SourceLocation, TemplateElement } from '@babel/types';
import {
  type TransformedInternalConfig,
  BaseProcessor,
  parseArray,
  processStyleObjects,
  serializeStyles,
  StyleObjectReturn,
} from '@pigment-css/utils';
import {
  type Expression,
  type Params,
  type TailProcessorParams,
  type ValueCache,
  validateParams,
} from '@wyw-in-js/processor-utils';
import {
  ExpressionValue,
  FunctionValue,
  LazyValue,
  Replacements,
  Rules,
  ValueType,
} from '@wyw-in-js/shared';
import { Primitive, ThemeArgs } from '../base';
import { BaseCssProcessor } from './css';

export type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

type GetClassName = () => string;

abstract class BaseKeyframesProcessor extends BaseCssProcessor {
  doEvaltimeReplacement() {
    this.replacer(this.astService.stringLiteral(this.getClassName()), false);
  }
}

/**
 * Only deals with css`` or css(metadata)`` calls.
 */
class KeyframesTaggedTemplateProcessor extends BaseKeyframesProcessor {
  constructor(params: Params, getClassName: GetClassName, ...args: TailProcessorParams) {
    super(params, getClassName, ...args);

    const [, callOrTemplate] = this.params;
    if (callOrTemplate[0] === 'template') {
      this.tempMetaClass = '';
    }
  }

  getDependencies(): ExpressionValue[] {
    const [, callOrTemplate, template] = this.params;
    const deps: ExpressionValue[] = [];
    if (callOrTemplate[0] === 'call') {
      deps.push(callOrTemplate[1]);
    } else if (callOrTemplate[0] === 'template') {
      deps.push(
        ...callOrTemplate[1].filter(
          (arg): arg is ExpressionValue => 'kind' in arg && arg.kind !== ValueType.CONST,
        ),
      );
    }
    if (template?.[0] === 'template') {
      deps.push(
        ...template[1].filter(
          (arg): arg is ExpressionValue => 'kind' in arg && arg.kind !== ValueType.CONST,
        ),
      );
    }
    return deps;
  }

  build(values: ValueCache): void {
    const { themeArgs, pigmentFeatures: { useLayer = true } = {} } = this
      .options as TransformedInternalConfig;
    const [, callOrTemplate, template] = this.params;
    // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
    const templateStrs: string[] = [];
    // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
    templateStrs.raw = [];
    const templateExpressions: Primitive[] = [];
    const templateParams = (callOrTemplate[0] === 'call' ? template[1] : callOrTemplate[1]) as (
      | ExpressionValue
      | TemplateElement
    )[];
    templateParams.forEach((param) => {
      if ('kind' in param) {
        switch (param.kind) {
          case ValueType.FUNCTION: {
            const value = values.get(param.ex.name) as TemplateCallback;
            templateExpressions.push(value(themeArgs));
            break;
          }
          case ValueType.CONST: {
            templateExpressions.push(param.value);
            break;
          }
          case ValueType.LAZY: {
            const evaluatedValue = values.get(param.ex.name);
            if (typeof evaluatedValue === 'function') {
              templateExpressions.push(evaluatedValue(themeArgs));
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
    const keyframe = `@keyframes ${this.getClassName()} {${styles}}`;

    const cssText = useLayer ? `@layer pigment.base{${keyframe}}` : keyframe;
    const className = this.getClassName();
    const rules: Rules = {
      [`.${className}`]: {
        className,
        cssText,
        displayName: this.displayName,
        start: this.location?.start ?? null,
      },
    };
    const location = this.location;
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
    this.classNames.push(className);
    this.artifacts.push(['css', [rules, sourceMapReplacements]]);
  }
}

/**
 * Only deals with css(...styleObjects) or or css(styleObject) css(metadata, [...styleObjects]) calls.
 */
class KeyframesObjectProcessor extends BaseKeyframesProcessor {
  variants: { $$cls: string; props: Record<string, string | number> }[] = [];

  getDependencies(): ExpressionValue[] {
    const [, [, ...callParams]] = this.params;
    return callParams as ExpressionValue[];
  }

  build(values: ValueCache): void {
    const [, [, ...callParams]] = this.params;
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
      getClassName: (variantName: string | undefined, variantValue: string | undefined) => {
        if (!variantName) {
          return this.getClassName();
        }
        return `${this.getClassName()}-${variantName}-${variantValue}`;
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
        const keyframe = `@keyframes ${this.getClassName()} {${style.cssText}}`;
        const cssText = layer && useLayer ? `@layer pigment.${layer} {${keyframe}}` : keyframe;
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

        this.artifacts.push(['css', [rules, sourceMapReplacements]]);
      });
    };
    this.classNames.push(...result.base.map((item) => item.className));
    addStyles(result.base, 'base');
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
export class KeyframesProcessor extends BaseProcessor {
  processor: BaseKeyframesProcessor;

  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
    validateParams(params, ['callee', '...'], BaseProcessor.SKIP);

    if (params.length === 3) {
      validateParams(
        params,
        ['callee', 'call', 'template'],
        `Invalid use of ${this.tagSource.imported} function.`,
      );
    } else {
      validateParams(
        params,
        ['callee', ['call', 'template']],
        `Invalid use of ${this.tagSource.imported} function.`,
      );
    }

    const getClassName = () => this.getBaseClass();
    const [calleeParam, callParams, maybeTemplate] = params;
    if (callParams[0] === 'template' || maybeTemplate?.[0] === 'template') {
      this.processor = new KeyframesTaggedTemplateProcessor(params, getClassName, ...args);
    } else {
      this.processor = new KeyframesObjectProcessor(
        [calleeParam, callParams],
        getClassName,
        ...args,
      );
    }

    this.dependencies.push(...this.processor.getDependencies());
  }

  build(values: ValueCache) {
    this.processor.build(values);
    this.artifacts.push(...this.processor.artifacts);
  }

  getBaseClass(): string {
    return this.className;
  }

  get asSelector(): string {
    return this.getBaseClass();
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.getBaseClass());
  }

  doEvaltimeReplacement(): void {
    this.processor.doEvaltimeReplacement();
  }

  doRuntimeReplacement(): void {
    this.processor.doRuntimeReplacement();
  }
}
