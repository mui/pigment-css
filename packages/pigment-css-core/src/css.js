import { generateErrorMessage } from './utils';

export default function css() {
  throw new Error(generateErrorMessage('css'));
}
