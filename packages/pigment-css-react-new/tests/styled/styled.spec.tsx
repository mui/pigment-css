import { t } from '@pigment-css/theme';
import { styled } from '../../src/styled';

declare module '@pigment-css/theme' {
  interface Theme {
    palette: {
      main: string;
    };
  }
}

const Button = styled('button')({
  color: 'red',
  variants: {
    btnSize: {
      small: {
        padding: 0,
      },
      medium: {
        padding: '1rem',
      },
      large: {
        padding: '2rem',
      },
    },
  },
});

const Div1 = styled.div<{ $size?: 'small' | 'medium' | 'large' }>`
  color: red;
  padding: ${({ $size }) => ($size === 'small' ? 2 : 4)};
`;

<Div1 onClick={() => undefined}>
  <Button type="button" btnSize="medium" />;
</Div1>;

const Button2 = styled('button')<{ $isRed: boolean }>({
  color: 'red',
  backgroundColor: 'red',
});

<Button2 $isRed className="" />;

function TestComponent({}: { className?: string; style?: React.CSSProperties; hello: string }) {
  return <div>Hello</div>;
}

styled(TestComponent)`
  color: red;
  background-color: ${t('$palette.main')};
`;
