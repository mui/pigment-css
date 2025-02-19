import type { Element } from 'stylis';
import { serialize, compile, stringify, middleware } from 'stylis';

function globalSelector(element: Element) {
  switch (element.type) {
    case 'rule':
      element.props = (element.props as string[]).map((value) => {
        if (value.match(/(:where|:is)\(/)) {
          value = value.replace(/\.[^:]+(:where|:is)/, '$1');
          return value;
        }
        return value;
      });
      break;
    default:
      break;
  }
}

function getSerializer() {
  return middleware([globalSelector, stringify]);
}

const serializer = getSerializer();

const stylis = (css: string, serializerParam = serializer) =>
  serialize(compile(css), serializerParam);

export function getGlobalSelector(asSelector: string) {
  return `$$GLOBAL-${asSelector}`;
}

export function preprocessor(selector: string, cssText: string) {
  let css = '';
  const isGlobal = selector.startsWith(getGlobalSelector(''));

  if (!isGlobal && cssText.startsWith('@keyframes')) {
    // Keyframes are already pre-processed.
    return cssText;
  }
  css += stylis(!isGlobal ? `${selector}{${cssText}}` : cssText);

  return css;
}

export function matchAdapterPath(path: string) {
  return path.includes('zero-styled');
}
