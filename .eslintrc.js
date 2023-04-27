'use strict';

module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'next/core-web-vitals',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'no-console': 0,
        'react/require-default-props': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-no-bind': 0,
        'react-hooks/exhaustive-deps': 0,
      },
    },
    {
      files: ['**/*.js'],
      extends: [
        'airbnb',
        'next',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
  ],
};
