import * as React from 'react';
import Stack from '../src/Stack';

<Stack
  display={{
    xs: 'flex',
    xl: 'inline-flex',
  }}
  direction="column"
/>;

// @ts-expect-error
<Stack display={{ ml: 'block' }} divider={<h1>Hello</h1>} />;
