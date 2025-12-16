/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  arrowParens: 'always',
  jsxSingleQuote: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  quoteProps: 'as-needed',
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 80,
      },
    },
  ],
};
