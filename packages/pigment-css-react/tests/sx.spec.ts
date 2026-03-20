import { SxProp } from '../src/sx';

const sx1: SxProp = { color: 'red' };

const sx2: SxProp = (theme) => ({
  color: theme.palette.primary.main,
});

const sx3: SxProp = [{ color: 'red' }, { backgroundColor: 'blue', color: 'white' }];

const test = true;
const sx4: SxProp = [
  test ? { color: 'red' } : { backgroundColor: 'blue', color: 'white' },
  false,
  (theme) => ({
    border: `1px solid ${theme.palette.primary.main}`,
  }),
];
