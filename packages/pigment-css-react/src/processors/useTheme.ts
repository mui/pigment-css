import type { Expression } from '@babel/types';
import { validateParams, type Params, type TailProcessorParams } from '@wyw-in-js/processor-utils';
import { type Replacements, type Rules } from '@wyw-in-js/shared';
import BaseProcessor from './base-processor';

export type Primitive = string | number | boolean | null | undefined;

export type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

export class UseThemeProcessor extends BaseProcessor {
  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
    if (params.length === 1) {
      throw BaseProcessor.SKIP;
    }
    validateParams(params, ['callee', ['call']], `Invalid use of ${this.tagSource.imported} tag.`);
  }

  build() {
    const cssText = '/* */';
    const rules: Rules = {
      [this.asSelector]: {
        className: this.className,
        cssText,
        displayName: this.displayName,
        start: this.location?.start ?? null,
      },
    };
    const sourceMapReplacements: Replacements = [
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
    this.artifacts.push(['css', [rules, sourceMapReplacements]]);
  }

  doEvaltimeReplacement() {
    this.replacer(this.value, false);
  }

  doRuntimeReplacement() {
    const t = this.astService;
    const themeIdentifier = t.addDefaultImport(`${this.getImportPath()}/theme`);
    this.replacer(themeIdentifier, false);
  }

  get asSelector() {
    return this.className;
  }

  get value(): Expression {
    return this.astService.nullLiteral();
  }
}
