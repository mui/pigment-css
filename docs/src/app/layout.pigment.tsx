import { t } from '@pigment-css/theme';
import { css } from '@pigment-css/react-new';

export const htmlCls = css`
  word-break: break-word;
  overflow-y: scroll;
`;

export const bodyCls = css`
  font-family: system-ui;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${t('$color.background')};
  color: ${t('$color.foreground')};
  min-width: 320px;
  line-height: 1.5;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
`;
