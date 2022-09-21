module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'prettier',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // https://eslint.org/docs/rules/indent#enforce-consistent-indentation-indent
    indent: ['warn', 2],

    // https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi
    semi: [2, 'always'],

    // https://eslint.org/docs/rules/linebreak-style#enforce-consistent-linebreak-style-linebreak-style
    'linebreak-style': 0,

    // https://github.com/import-js/eslint-plugin-import/blob/v2.25.4/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // https://github.com/import-js/eslint-plugin-import/blob/v2.25.4/docs/rules/no-unresolved.md
    'import/no-unresolved': 'off',

    // https://github.com/import-js/eslint-plugin-import/blob/v2.25.4/docs/rules/extensions.md
    'import/extensions': 'off',

    // https://eslint.org/docs/latest/rules/no-console
    'no-console': 'off',

    // https://eslint.org/docs/latest/rules/no-useless-constructor
    'no-useless-constructor': 'off',

    // https://eslint.org/docs/latest/rules/no-param-reassign
    'no-param-reassign': 'off',

    // https://eslint.org/docs/latest/rules/no-return-await
    'no-return-await': 'off',

    // https://eslint.org/docs/latest/rules/func-names
    'func-names': 'off',

    // https://eslint.org/docs/latest/rules/class-methods-use-this
    'class-methods-use-this': 'off',

    // https://eslint.org/docs/latest/rules/max-len
    'max-len': 'off',

    // https://eslint.org/docs/latest/rules/no-shadow
    'no-shadow': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-interface.md
    '@typescript-eslint/no-empty-interface': 'off',
  },
};
