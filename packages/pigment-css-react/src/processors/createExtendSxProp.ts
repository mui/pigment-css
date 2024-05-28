import type { Expression, Params, TailProcessorParams } from '@wyw-in-js/processor-utils';
import BaseProcessor from './base-processor';

export class CreateExtendSxPropProcessor extends BaseProcessor {
  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
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
      process.env.PACKAGE_NAME as string,
    );

    this.replacer(t.callExpression(extendSxPropImportIdentifier, []), true);
  }

  public override get asSelector(): string {
    // For completeness, this is not intended to be used.
    return `.${this.className}`;
  }
}
