import { expect } from 'chai';
import { t } from '../src/theme';

describe('t', () => {
  it('should return the passed value', () => {
    // @ts-ignore Ignoring for tests
    expect(t('$palette.primary.main')).to.equal('$palette.primary.main');
  });
});
