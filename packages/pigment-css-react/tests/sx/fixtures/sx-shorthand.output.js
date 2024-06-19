import { sx as _sx } from '@pigment-css/react';
function App(props) {
  return (
    <main>
      <div
        {..._sx(
          {
            className: 'd1h14by3',
            vars: {
              'd1h14by3-0': [props.tier.title === 'Professional' ? 'grey.50' : undefined, false],
            },
          },
          {},
        )}
      />
    </main>
  );
}
