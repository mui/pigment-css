import { sx as _sx } from '@pigment-css/react';
function App(props) {
  return (
    <main>
      <div
        {..._sx(
          {
            className: 'dtadr1p',
            vars: {
              'dtadr1p-0': [
                props.tier.title === 'Professional' ? 'var(--mui-palette-grey-50)' : undefined,
                false,
              ],
            },
          },
          {},
        )}
      />
    </main>
  );
}
