module.exports = {
  extends: 'erb',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-props-no-spreading': 'off',

    'react-hooks/exhaustive-deps': 'off',

    'promise/always-return': 'off',

    'compat/compat': 'off',

    // 'jsx-a11y/no-noninteractive-element-interactions': 'off',

    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'global-require': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./webpack/config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
