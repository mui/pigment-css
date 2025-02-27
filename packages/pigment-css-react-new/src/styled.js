import { generateErrorMessage } from '@pigment-css/core';

export function styled() {
  throw new Error(generateErrorMessage('styled'));
}
