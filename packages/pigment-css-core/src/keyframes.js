import { generateErrorMessage } from './utils';

/**
 * `__wyw_dynamic_import` is a special global var that is set during the evaluation phase by wyw.
 * So during eval phase, it can happen that some code is calling the runtime function.
 * We do not want to throw error in that case as we want the evaluation to happen.
 */
export default function keyframes() {
  throw new Error(generateErrorMessage('keyframes'));
}
