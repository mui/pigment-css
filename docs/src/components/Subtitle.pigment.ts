import { styled } from '@pigment-css/react-new';
import { applyText } from 'docs/utils/theme';

export const Subtitle = styled.p(({ theme }) => ({
  ...applyText(theme, 'lg'),
  textWrap: 'balance',
  color: '$color.gray.0',
  marginBottom: '1.25rem',
}));
