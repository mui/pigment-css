import * as React from 'react';

export function styled(component) {
  function classWrapper({ displayName }) {
    // eslint-disable-next-line react/prop-types
    const WrappedComponent = React.forwardRef(function WrappedComponent({ as: asProp, ...rest }) {
      const FinalComponent = asProp ?? component;
      return <FinalComponent {...rest} />;
    });
    WrappedComponent.displayName = `Pigment(${displayName ?? 'Styled'})`;
  }
  return classWrapper;
}
