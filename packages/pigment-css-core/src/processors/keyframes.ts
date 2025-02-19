import { Params, TailProcessorParams, validateParams } from '@wyw-in-js/processor-utils';
import { evaluateClassNameArg } from '@pigment-css/utils';
import { CssProcessor } from './css';
import { BaseInterface } from '../css';

export type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

/**
 * Scoped keyframes class generation.
 */
export class KeyframesProcessor extends CssProcessor {
  private staticClass: BaseInterface | null = null;

  getClassName() {
    if (this.staticClass?.className) {
      if (typeof this.staticClass.className === 'string') {
        return this.staticClass.className;
      }
      return this.staticClass.className();
    }
    return this.className;
  }

  constructor(params: Params, ...args: TailProcessorParams) {
    super(params, ...args);

    if (params.length === 3) {
      validateParams(
        params,
        ['callee', ['call'], ['call', 'template']],
        `Invalid usage of ${this.tagSource.imported}.`,
      );
      const [, [, callOpt]] = params;
      this.staticClass = evaluateClassNameArg(callOpt.source) as BaseInterface;
    }
  }

  wrapStyle(style: string): string {
    return `@keyframes ${this.getClassName()} {${style}}`;
  }

  doEvaltimeReplacement(): void {
    this.processor.doEvaltimeReplacement();
  }

  doRuntimeReplacement(): void {
    this.doEvaltimeReplacement();
  }
}
