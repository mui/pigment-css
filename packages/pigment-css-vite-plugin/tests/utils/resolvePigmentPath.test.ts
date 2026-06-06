/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { resolvePigmentPath } from '../../src/utils/resolvePigmentPath';

describe('processPigmentTheme', () => {
  describe('resolvePigmentPath', () => {
    it('should resolve pigment styles path in Unix env', () => {
      const UnixSep = '/';
      const source = '@mui/material-pigment-css/styles.css';
      const allLibs = ['@mui/material-pigment-css', '@mui/material-other'];
      const finalTransformLibraries = allLibs.map((lib) => lib.split('/').join(UnixSep));
      // ✅ It works to resolve path in allLibs (Unix env)
      expect(resolvePigmentPath(source, allLibs)).to.equal('\0zero-runtime-styles.css');
      // ✅ It works to resolve path in finalTransformLibraries (Unix env)
      expect(resolvePigmentPath(source, finalTransformLibraries)).to.equal(
        '\0zero-runtime-styles.css',
      );
    });

    it('should resolve pigment styles path in Windows env', () => {
      const WindowsSep = '\\';
      const source = '@mui/material-pigment-css/styles.css';
      const allLibs = ['@mui/material-pigment-css', '@mui/material-other'];
      const finalTransformLibraries = allLibs.map((lib) => lib.split('/').join(WindowsSep));
      // ✅ It works to resolve path in allLibs (Windows env)
      expect(resolvePigmentPath(source, allLibs)).to.equal('\0zero-runtime-styles.css');
      // ❌ It doesn't work to resolve path in finalTransformLibraries (Windows env)
      expect(resolvePigmentPath(source, finalTransformLibraries)).to.be.null;
    });

    it('should resolve pigment theme path', () => {
      const source = '@mui/material-pigment-css/theme';
      const allLibs = ['@mui/material-pigment-css', '@mui/material-other'];
      expect(resolvePigmentPath(source, allLibs)).to.equal('\0zero-runtime-theme.js');
    });

    it('should not resolve other path', () => {
      const source = '@mui/material-pigment-css-other/styles.css';
      const allLibs = ['@mui/material-pigment-css', '@mui/material-other'];
      expect(resolvePigmentPath(source, allLibs)).to.be.null;
    });
  });
});
