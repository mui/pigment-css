import { t } from '@pigment-css/theme';
import css from '../../src/css';

const cls1 = css({
  color: 'red',
  WebkitAlignContent: '-moz-initial',
});

declare module '@pigment-css/theme' {
  interface Theme {
    palette: {
      main: string;
    };
  }
}

const cls2 = css(({ theme }) => ({
  color: '$palette.main',
  // @ts-expect-error main1 does not exists in theme.palette
  backgroundColor: theme.palette.main1,
  border: `1px solid ${t('$palette.main')}`,
}));

const cls2WithMetadata = css(
  {
    className: 'Test1',
  },
  ({ theme }) => ({
    color: '$palette.main',
    // @ts-expect-error main1 does not exists in theme.palette
    backgroundColor: theme.palette.main1,
    border: `1px solid ${t('$palette.main')}`,
  }),
);

export const cls3WithMetadata = css(
  {
    className: 'Test1',
  },
  [
    ({ theme }) => ({
      color: '$palette.main',
      // @ts-expect-error main1 does not exists in theme.palette
      backgroundColor: theme.palette.main1,
      border: `1px solid ${t('$palette.main')}`,
    }),
    ({ theme }) => ({
      color: '$palette.main',
      // @ts-expect-error main1 does not exists in theme.palette
      backgroundColor: theme.palette.main1,
      border: `1px solid ${t('$palette.main')}`,
    }),
  ],
);

const cls3 = css`
  color: red;
  background-color: ${t('$palette.main')};
`;

const cls4WithMetadata = css({
  className: 'Test',
})`
  color: red;
  background-color: ${t('$palette.main')};
`;
