import { t } from '@pigment-css/theme';
import { css, styled } from '@pigment-css/react-new';
import { spacing } from 'docs/src/utils/theme';

export const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingTop: '3rem',
  paddingBottom: 'calc(3rem + 5vh)',
  paddingInline: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled('div')({
  width: '100%',
  maxWidth: '25rem',
  textWrap: 'balance',
});

export const Heading = styled('h1')({
  fontSize: t('$text.xl.default'),
  fontWeight: 500,
  lineHeight: t('$text.xl.lineHeight'),
  letterSpacing: t('$text.xl.letterSpacing'),
  marginBottom: '0.5rem',
});

export const Caption = styled.p`
  color: ${t('$color.gray.600')};
  margin-bottom: 2rem;
`;

export const linkStyle = css(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  padding: ${spacing(theme, 1)};
  gap: ${spacing(theme, 1)};
  margin: ${spacing(theme, -1)};
`,
);
