import { Identifier } from '@babel/types';
import { evaluateClassNameArg } from '@pigment-css/utils';
import {
  type CallParam,
  type Expression,
  type MemberParam,
  type Params,
  type TailProcessorParams,
  validateParams,
} from '@wyw-in-js/processor-utils';
import { ValueType } from '@wyw-in-js/shared';
import { CssProcessor } from '@pigment-css/core/processors/css';
import { BaseInterface } from '@pigment-css/core/css';

export type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

type WrappedNode =
  | string
  | {
      node: Identifier;
      source: string;
    };

const REACT_COMPONENT = '$$reactComponent';

export class StyledProcessor extends CssProcessor {
  tagName: WrappedNode = '';

  // eslint-disable-next-line class-methods-use-this
  get packageName() {
    return process.env.PACKAGE_NAME as string;
  }

  basePath = `${this.packageName}/runtime`;

  constructor(params: Params, ...args: TailProcessorParams) {
    const [callee, callOrMember, callOrTemplate] = params;
    super([callee, callOrTemplate], ...args);

    if (params.length === 3) {
      validateParams(
        params,
        ['callee', ['call', 'member'], ['call', 'template']],
        `Invalid use of ${this.tagSource.imported} function.`,
      );

      this.setTagName(callOrMember as CallParam | MemberParam);
    } else {
      throw new Error(`${this.packageName} Invalid call to ${this.tagSource.imported} function.`);
    }
  }

  private setTagName(param: CallParam | MemberParam) {
    if (param[0] === 'member') {
      this.tagName = param[1];
    } else {
      const [, element, callOpt] = param;
      switch (element.kind) {
        case ValueType.CONST: {
          if (typeof element.value === 'string') {
            this.tagName = element.value;
          }
          break;
        }
        case ValueType.LAZY: {
          this.tagName = {
            node: element.ex,
            source: element.source,
          };
          this.dependencies.push(element);
          break;
        }
        case ValueType.FUNCTION: {
          this.tagName = REACT_COMPONENT;
          break;
        }
        default:
          break;
      }

      if (callOpt) {
        this.processor.staticClass = evaluateClassNameArg(callOpt.source) as BaseInterface;
      }
    }
  }

  getBaseClass(): string {
    return this.className;
  }

  get asSelector(): string {
    return this.processor.getBaseClass();
  }

  get value(): Expression {
    return this.astService.stringLiteral(`.${this.processor.getBaseClass()}`);
  }

  createReplacement() {
    const t = this.astService;
    const callId = t.addNamedImport('styled', this.getImportPath());
    const elementOrComponent = (() => {
      if (typeof this.tagName === 'string') {
        if (this.tagName === REACT_COMPONENT) {
          return t.arrowFunctionExpression([], t.blockStatement([]));
        }
        return t.stringLiteral(this.tagName);
      }
      if (this.tagName?.node) {
        return t.callExpression(t.identifier(this.tagName.node.name), []);
      }
      return t.nullLiteral();
    })();
    const firstCall = t.callExpression(callId, [elementOrComponent]);
    return t.callExpression(firstCall, [this.getStyleArgs()]);
  }
}
