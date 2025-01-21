/**
 * Slightly unsafe but way faster way to evaluate JS code than using babel transforms.
 *
 * @param expressionString The JS code expression to evaluate
 */
export function evaluateClassNameArg<T>(expressionString: string): T {
  // Create sandbox context
  const context = Object.create(null);
  const safeEval = new Function('context', `with(context) { return ${expressionString}; }`);
  return safeEval(context);
}
