import { styled } from '@pigment-css/react';
import * as React from 'react';

export interface CalloutProps {
  children: React.ReactNode;
  type: 'info' | 'warning' | 'error' | 'success';
}

export const Callout = styled('div')<{ type?: 'info' | 'warning' | 'success' | 'error' }>({
  border: '1px solid',
  borderRadius: '8px',
  padding: 'var(--space-4)',
  margin: 'var(--space-6) 0',
  '& p': {
    color: 'var(--gray-text-1)',
    fontSize: 'var(--fs-3)',
    lineHeight: '20px',
    marginBottom: 'var(--space-2)',
  },
  '> :last-child': {
    marginBottom: 0,
  },
  variants: [
    {
      props: {
        type: 'info',
      },
      style: {
        backgroundColor: '#f9feff',
        borderColor: '#a9daed',
      },
    },
    {
      props: {
        type: 'warning',
      },
      style: {
        backgroundColor: '#fefdfb',
        borderColor: '#f3d768',
      },
    },
    {
      props: {
        type: 'success',
      },
      style: {
        backgroundColor: '#fbfefd',
        borderColor: '#acdec8',
      },
    },
    {
      props: {
        type: 'error',
      },
      style: {
        backgroundColor: '#fffcfc',
        borderColor: '#fdbdbe',
      },
    },
  ],
});
