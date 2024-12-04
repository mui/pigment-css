module.exports = {
  rules: {
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/named': 'off',
    'import/no-duplicates': 'off',
    'import/no-named-as-default': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': 'off',
    // create-vite generates .jsx
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['sx'] }],
  },
  overrides: [
    {
      files: ['pigment-css-remix-ts/**/*.*'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
