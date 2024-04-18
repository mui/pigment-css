'use client';
/**
 * This package has it's own version of RtlProvider to avoid including
 * @mui/system in the bundle if someone is not using it.
 */
import * as React from 'react';
import PropTypes from 'prop-types';

type RtlContextType = boolean | undefined;

type RtlProviderProps = {
  value?: RtlContextType;
};

const RtlContext = React.createContext<RtlContextType>(false);

function RtlProvider({ value, ...props }: RtlProviderProps) {
  return <RtlContext.Provider value={value ?? true} {...props} />;
}

RtlProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  value: PropTypes.bool,
} as any;

export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};

export default RtlProvider;
