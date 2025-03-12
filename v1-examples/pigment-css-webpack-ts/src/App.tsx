import { styled, keyframes } from '@pigment-css/react-new';
import { ThemeSelector } from './ThemeSelector';

const gradientAnimation = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

const Container = styled.div(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.colors.background.gradient,
  backgroundSize: '400% 400%',
  color: 'white',
  padding: '2rem 0',
  [theme.utils.reducedMotion('no-preference')]: {
    animation: `${gradientAnimation} 15s ease infinite`,
  },
  [theme.breakpoints.gt('md')]: {
    padding: '1rem 0',
  },
}));

const Header = styled.header(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '1rem',
  marginBottom: '4rem',
  backgroundColor: theme.colors.background.glass,
  backdropFilter: 'blur(12px)',
  boxShadow: `0 4px 30px ${theme.effects.glass.shadow}`,
  border: `1px solid ${theme.colors.border.glass}`,
  [theme.breakpoints.lt('md')]: {
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
}));

const Logo = styled.h1(({ theme }) => ({
  margin: 0,
  fontSize: '2rem',
  fontWeight: 700,
  letterSpacing: '-0.05em',
  [theme.breakpoints.lt('md')]: {
    fontSize: '1.75rem',
  },
}));

const Hero = styled.main(({ theme }) => ({
  maxWidth: '800px',
  textAlign: 'center',
  marginTop: '4rem',
  padding: '0 1rem',
  [theme.breakpoints.gt('md')]: {
    marginTop: '2rem',
  },
}));

const Title = styled.h2(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  marginBottom: '1.5rem',
  lineHeight: 1.1,
  [theme.breakpoints.gt('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.gt('sm')]: {
    fontSize: '2.5rem',
  },
}));

const Subtitle = styled.p(({ theme }) => ({
  fontSize: '1.5rem',
  opacity: 0.9,
  marginBottom: '3rem',
  lineHeight: 1.6,
  [theme.breakpoints.gt('md')]: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  [theme.breakpoints.gt('sm')]: {
    fontSize: '1.1rem',
  },
}));

const ButtonGroup = styled.div(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  [theme.breakpoints.lt('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '0.75rem',
  },
}));

const Button = styled.button(({ theme }) => ({
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  [theme.utils.reducedMotion('no-preference')]: {
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      opacity: 0.9,
    },
  },
  [theme.utils.reducedMotion('reduce')]: {
    '&:hover': {
      opacity: 0.9,
    },
  },
  [theme.breakpoints.gt('sm')]: {
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: theme.colors.text.primary,
        color: theme.colors.primary,
      },
      secondary: {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.colors.primary}`,
        color: theme.colors.text.primary,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
}));

const FeatureGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  width: '100%',
  maxWidth: '1200px',
  marginTop: '6rem',
  padding: '0 1rem',
  [theme.breakpoints.lt('md')]: {
    marginTop: '4rem',
    gap: '1.5rem',
  },
  [theme.breakpoints.lt('sm')]: {
    marginTop: '3rem',
    gap: '1rem',
  },
}));

const FeatureCard = styled.div(({ theme }) => ({
  color: theme.colors.text.primary,
  backgroundColor: theme.colors.background.glass,
  backdropFilter: 'blur(12px)',
  boxShadow: `0 4px 30px ${theme.effects.glass.shadow}`,
  border: `1px solid ${theme.colors.border.glass}`,
  borderRadius: '1rem',
  padding: '2rem',
  textAlign: 'left',
  [theme.utils.reducedMotion('no-preference')]: {
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  [theme.breakpoints.lt('md')]: {
    padding: '1.5rem',
  },
  [theme.breakpoints.lt('sm')]: {
    padding: '1.25rem',
  },
}));

const FeatureTitle = styled.h3(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: '1rem',
  fontWeight: 600,
  [theme.breakpoints.gt('sm')]: {
    fontSize: '1.25rem',
  },
}));

const FeatureDescription = styled.p(({ theme }) => ({
  fontSize: '1.1rem',
  opacity: 0.9,
  lineHeight: 1.6,
  [theme.breakpoints.gt('sm')]: {
    fontSize: '1rem',
  },
}));

function App() {
  return (
    <Container>
      <Header>
        <Logo>Pigment&nbsp;CSS</Logo>
        <ThemeSelector />
      </Header>

      <Hero>
        <Title>Build beautiful interfaces with Pigment CSS</Title>
        <Subtitle>
          A modern CSS-in-JS solution that makes styling React components a breeze. Write
          maintainable styles with the power of TypeScript.
        </Subtitle>
        <ButtonGroup>
          <Button variant="primary" as="a" href="https://pigment-css.com">
            Get Started
          </Button>
          <Button variant="secondary" as="a" href="https://github.com/mui/pigment-css">
            View on GitHub
          </Button>
        </ButtonGroup>
      </Hero>

      <FeatureGrid>
        <FeatureCard>
          <FeatureTitle>Type-Safe Styling</FeatureTitle>
          <FeatureDescription>
            Get complete TypeScript support with autocomplete and type checking for your styles.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Zero Runtime</FeatureTitle>
          <FeatureDescription>
            Styles are processed at build time, resulting in minimal runtime overhead.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Dynamic Theming</FeatureTitle>
          <FeatureDescription>
            Create and switch between themes with ease. Full support for dark mode and custom
            themes.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
    </Container>
  );
}

export default App;
