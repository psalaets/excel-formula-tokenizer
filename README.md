# excel-formula-tokenizer

Tokenize Excel formulas.

This is E. W. Bachtal's excel formula tokenizer from http://ewbi.blogs.com/develops/2004/12/excel_formula_p.html

## Install

`npm install excel-formula-tokenizer -S`

or

`yarn add excel-formula-tokenizer`

## Usage

```js
const {tokenize} = require('excel-formula-tokenizer');

const tokens = tokenize('SUM(1, 2)');

tokens.forEach({value, type, subtype} => {
  console.log(`value:   ${value}`);
  console.log(`type:    ${type}`);
  console.log(`subtype: ${subtype}`);
  console.log();
});
```

### API

#### tokenize(formula, options)

- formula - string, excel formula
- options - optional object
  - options.language - Language that the formula is in: `'en-US'` or `'de-DE'`

## License

MIT
