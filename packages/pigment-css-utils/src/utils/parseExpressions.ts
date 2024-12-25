import { parseExpression, ParserOptions } from '@babel/parser';
import { ArrayExpression } from '@babel/types';

/**
 * Parses array expression string to AST for locating sourcemap points.
 */
export function parseArray(
  expressionStr: string,
  opts: Pick<ParserOptions, 'startColumn' | 'startIndex' | 'startLine'>,
): ArrayExpression | null {
  const expr = parseExpression(expressionStr, opts);
  if (expr.type === 'ArrayExpression') {
    return expr;
  }
  return null;
}
