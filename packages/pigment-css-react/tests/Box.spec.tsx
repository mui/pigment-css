import * as React from 'react';
import Box from '../src/Box';

export function App() {
  return (
    <Box as="div" sx={{ display: 'flex' }}>
      <Box as="p" sx={() => ({ color: 'primary' })}>
        Hello{' '}
        <Box as="a" href="https://mui.com" download>
          Link
        </Box>
        <Box component="dialog" open>
          Dialog
        </Box>
        {/* @ts-expect-error */}
        <Box component="dialog" as="button" href>
          Dialog 2
        </Box>
      </Box>
    </Box>
  );
}
