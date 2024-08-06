import * as React from 'react';
import Stack from '../src/Stack';

<Stack spacing={2} direction={{ md: 'row' }} />;

<Stack className="" style={{ accentColor: 'ActiveBorder', marginTop: '1rem' }} data-testid="foo" />;

<Stack
  // @ts-expect-error
  display={{
    xs: 'flex',
    xl: 'inline-flex',
  }}
  direction="column"
/>;

// @ts-expect-error
<Stack display={{ ml: 'block' }} divider={<h1>Hello</h1>} />;
