import type { NodePath } from '@babel/core';
import type { CallExpression, Expression } from '@babel/types';
import {
  validateParams,
  type Params,
  type TailProcessorParams,
  type ValueCache,
} from '@wyw-in-js/processor-utils';
import { ValueType, type ExpressionValue, type Replacements, type Rules } from '@wyw-in-js/shared';
import type { IOptions } from './styled';
import { processCssObject } from '../utils/processCssObject';
import { cssFnValueToVariable } from '../utils/cssFnValueToVariable';
import BaseProcessor from './base-processor';
import spreadSxProp from '../utils/spreadSxProp';

export class SxProcessor extends BaseProcessor {
  sxArguments: ExpressionValue[] = [];

  variableIdx: number = 0;

  collectedVariables: [string, Expression, boolean][] = [];

  elementClassName = '';

  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
    validateParams(params, ['callee', 'call'], 'Invalid usage of sx call.');
    const [, [, ...sxCallArguments]] = params;
    sxCallArguments.forEach((arg) => {
      if ('kind' in arg) {
        this.dependencies.push(arg);
      }
    });
    this.sxArguments = sxCallArguments;
  }

  build(values: ValueCache) {
    const [sxStyle, elementClassExpression] = this.sxArguments;
    if (elementClassExpression.kind === ValueType.LAZY) {
      const elementClassValue = values.get(elementClassExpression.ex.name);
      if (typeof elementClassValue === 'string') {
        this.elementClassName = elementClassValue;
      }
    }

    let cssText: string = '';
    if (sxStyle.kind === ValueType.CONST) {
      if (sxStyle.ex.type === 'StringLiteral') {
        cssText = sxStyle.ex.value;
      }
    } else {
      const styleObjOrFn = values.get(sxStyle.ex.name);
      cssText = this.processCss(styleObjOrFn, sxStyle);
    }

    if (!cssText) {
      return;
    }

    const rules: Rules = {
      [this.asSelector]: {
        className: this.className,
        cssText,
        displayName: this.displayName,
        start: this.location?.start ?? null,
      },
    };
    const replacements: Replacements = [
      {
        length: cssText.length,
        original: {
          start: {
            column: this.location?.start.column ?? 0,
            line: this.location?.start.line ?? 0,
          },
          end: {
            column: this.location?.end.column ?? 0,
            line: this.location?.end.line ?? 0,
          },
        },
      },
    ];
    this.artifacts.push(['css', [rules, replacements]]);
  }

  doEvaltimeReplacement() {
    this.replacer(this.value, false);
  }

  doRuntimeReplacement() {
    const t = this.astService;
    // do not replace if sx prop is not a Pigment styled component
    if (this.artifacts.length === 0) {
      return;
    }
    let result = this.value;
    if (this.collectedVariables.length) {
      const varProperties: ReturnType<typeof t.objectProperty>[] = this.collectedVariables.map(
        ([variableId, expression, isUnitLess]) => {
          switch (expression.type) {
            case 'ArrowFunctionExpression': {
              return t.objectProperty(
                t.stringLiteral(variableId),
                t.arrayExpression([expression.body as Expression, t.booleanLiteral(isUnitLess)]),
              );
            }
            case 'FunctionExpression': {
              const returnStatement = expression.body.body[0];
              if (returnStatement.type === 'ReturnStatement' && returnStatement.argument) {
                return t.objectProperty(
                  t.stringLiteral(variableId),
                  t.arrayExpression([returnStatement.argument, t.booleanLiteral(isUnitLess)]),
                );
              }
              throw this.sxArguments[0].buildCodeFrameError(
                'Invalid transformation encountered. The callbacks in sx properties should directly return an Expression.',
              );
            }
            default: {
              return t.objectProperty(t.stringLiteral(variableId), t.nullLiteral());
            }
          }
        },
      );

      const obj = t.objectExpression([
        t.objectProperty(t.identifier('className'), t.stringLiteral(this.className)),
        t.objectProperty(t.identifier('vars'), t.objectExpression(varProperties)),
      ]);
      result = obj;
    }

    /**
     * Replace the sx call with the transformed result. It works for both JSX and non-JSX calls.
     *
     * For example:
     * <Component sx={_sx({ color: 'red' })} /> to <Component sx={_sx('sd5jss7')} />
     * <Component sx={_sx({ bgcolor: 'red', color: props.color })} /> to <Component sx={_sx({ className: 'bc1d15y', vars: { 'bc1d15y-0': [props.color, false], }})} />
     */
    this.replacer((_tagPath) => {
      const tagPath = _tagPath as NodePath<CallExpression>;
      return t.callExpression(tagPath.get('callee').node, [result]);
    }, false);

    /**
     * Replace the sx prop with runtime sx
     */
    let pathToReplace: undefined | NodePath<CallExpression>;
    this.replacer((_tagPath) => {
      const tagPath = _tagPath as NodePath<CallExpression>;

      const isArrayArgument = spreadSxProp(tagPath);
      if (isArrayArgument) {
        pathToReplace = tagPath;
      }

      return tagPath.node;
    }, false);

    if (pathToReplace) {
      // need to replace outside of `this.replacer` to preserve the import statement
      pathToReplace.replaceWith(pathToReplace.node.arguments[0]);
    }
  }

  get asSelector(): string {
    return `.${this.className}`;
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.className);
  }

  private processCss(styleObjOrFn: unknown, expressionValue: ExpressionValue) {
    const { themeArgs } = this.options as IOptions;
    const styleObj =
      typeof styleObjOrFn === 'function' ? styleObjOrFn(themeArgs?.theme) : styleObjOrFn;

    const res = cssFnValueToVariable({
      styleObj,
      expressionValue,
      getVariableName: (cssKey: string, source: string, hasUnit: boolean) =>
        this.getCustomVariableId(cssKey, source, hasUnit),
      filename: this.context.filename,
      options: this.options as IOptions,
    });
    if (res.length) {
      this.collectedVariables.push(...res);
    }

    return processCssObject(styleObj, themeArgs, false);
  }
}
