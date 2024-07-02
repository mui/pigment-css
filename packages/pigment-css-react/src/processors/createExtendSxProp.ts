import {
  validateParams,
  type Expression,
  type Params,
  type TailProcessorParams,
} from '@wyw-in-js/processor-utils';
import BaseProcessor from './base-processor';

export class CreateExtendSxPropProcessor extends BaseProcessor {
  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
    validateParams(params, ['callee', ['call']], `Invalid use of ${this.tagSource.imported} tag.`);
  }

  // eslint-disable-next-line class-methods-use-this
  build(): void {}

  doEvaltimeReplacement(): void {
    this.replacer(this.value, false);
  }

  get value(): Expression {
    return this.astService.nullLiteral();
  }

  doRuntimeReplacement(): void {
    const t = this.astService;

    const extendSxPropImportIdentifier = t.addNamedImport(
      this.tagSource.imported,
      this.getImportPath(),
    );

    this.replacer(t.callExpression(extendSxPropImportIdentifier, []), true);
  }

  public override get asSelector(): string {
    // For completeness, this is not intended to be used.
    return `.${this.className}`;
  }
}
