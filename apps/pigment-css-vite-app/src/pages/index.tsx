import * as React from 'react';
import Stack from '@pigment-css/react/Stack';
import Container from '@pigment-css/react/Container';
import { styled, css } from '@pigment-css/react';

type StackProps = React.ComponentProps<typeof Stack>;

const labelClass = css({
  padding: '0px 10px',
});

const Card = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
  color: white;
  padding: 8px 16px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  background-color: rgb(26, 32, 39);
`;

export default function InteractiveStack() {
  const [direction, setDirection] = React.useState<StackProps['direction']>('column');
  const [spacing, setSpacing] = React.useState<string | number>(2);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'direction': {
        setDirection(event.target.value as StackProps['direction']);
        break;
      }
      case 'spacing': {
        setSpacing(
          event.target.value.match(/^[0-9]+\.?[0-9]*$/)
            ? parseFloat(event.target.value)
            : event.target.value,
        );
        break;
      }
      default:
        break;
    }
  }, []);

  const jsx = `
<Stack
  direction="${direction}"
  spacing=${typeof spacing === 'number' ? `{${spacing}}` : `"${spacing}"`}
>
`;

  return (
    <Container maxWidth="md">
      <Stack spacing={2} sx={{ flexGrow: 1, padding: 2 }}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <fieldset>
            <legend>Direction</legend>
            {['row', 'row-reverse', 'column', 'column-reverse'].map((item) => (
              <label key={item} className={labelClass}>
                {item}
                <input
                  type="radio"
                  name="direction"
                  value={item}
                  checked={item === direction}
                  onChange={handleChange}
                />
              </label>
            ))}
          </fieldset>
          <fieldset sx={{ mt: 1 }}>
            <legend>Spacing</legend>
            {[0, 0.5, 1, 2, 3, 4, 8, 12, '2rem'].map((item) => (
              <label key={item} className={labelClass}>
                {item}
                <input
                  type="radio"
                  name="spacing"
                  value={item}
                  checked={item === spacing}
                  onChange={handleChange}
                />
              </label>
            ))}
          </fieldset>
        </Stack>
        <Stack direction={direction} spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Card key={value}>{`Item ${value + 1}`}</Card>
          ))}
        </Stack>
        <textarea style={{ colorScheme: 'dark' }} value={jsx} readOnly rows={8} />
      </Stack>
    </Container>
  );
}
