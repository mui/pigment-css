import { t } from '@pigment-css/theme';
import { styled } from '@pigment-css/react-new';

import * as CodeBlockBase from './components/CodeBlock';
import { Code as CodeBase } from './components/Code.pigment';
import { Subtitle as SubtitleBase } from './components/Subtitle.pigment';
import { applyText, spacing } from './utils/theme';
import { linkStyle } from './components/Link.pigment';

export const Heading = styled('h1')(({ theme }) => ({
  position: 'relative',
  textWrap: 'balance',
  [`.${linkStyle}`]: {
    position: 'absolute',
    visibility: 'hidden',
    left: -25,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '$color.foreground',
  },
  '&:hover': {
    [`.${linkStyle}`]: {
      visibility: 'visible',
    },
  },
  variants: {
    lvl: {
      one: {
        marginBottom: spacing(theme, 4),
        fontWeight: '$font.weight.bold',
        ...applyText(theme, '3xl'),
      },
      two: {
        marginTop: spacing(theme, 10),
        marginBottom: spacing(theme, 4),
        ...applyText(theme, 'xl'),
        scrollMarginTop: spacing(theme, 6),
        fontWeight: t('$font.weight.medium'),
        '& + .inner-separator': {
          borderTop: `1px solid ${t('$color.gray.200')}`,
          marginBottom: spacing(theme, 5),
        },
      },
      three: {
        marginTop: spacing(theme, 8),
        marginBottom: spacing(theme, 1.5),
        scrollMarginTop: spacing(theme, 6),
        ...applyText(theme, 'lg'),
        fontWeight: t('$font.weight.medium'),
      },
      other: {
        three: {
          marginTop: spacing(theme, 8),
          marginBottom: spacing(theme, 1.5),
          scrollMarginTop: spacing(theme, 6),
          ...applyText(theme, 'lg'),
        },
      },
    },
  },
  defaultVariants: {
    lvl: 'one',
  },
}));

export const Paragraph = styled.p(
  ({ theme }) => `
  margin-bottom: ${spacing(theme, 4)};
`,
);

export const Li = styled.li(({ theme }) => ({
  marginBottom: spacing(theme, 0.5),
}));

export const Ul = styled.ul(({ theme }) => ({
  marginBottom: spacing(theme, 4),
  marginInlineStart: spacing(theme, 4.5),
  listStyleType: 'disc',
}));

export const Ol = styled.ul(({ theme }) => ({
  marginBottom: spacing(theme, 4),
  marginInlineStart: spacing(theme, 7),
  listStyleType: 'decimal',
}));

export const Strong = styled.strong({
  fontWeight: '$font.weight.medium',
});

export const Subtitle = styled(SubtitleBase)(({ theme }) => ({
  marginTop: spacing(theme, -2),
  marginBottom: spacing(theme, 5),
}));

export const CodeBlock = {
  Root: styled(CodeBlockBase.Root)(({ theme }) => ({
    marginTop: spacing(theme, 5),
    marginBottom: spacing(theme, 6),
  })),
};

export const Code = styled(CodeBase)(({ theme }) => ({
  color: '$color.blue',
  margin: `0 ${spacing(theme, '0.1em')}`,
}));
