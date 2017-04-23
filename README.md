# excel-formula-tokenizer

Tokenize Excel formulas.

This is E. W. Bachtal's excel formula tokenizer from http://ewbi.blogs.com/develops/2004/12/excel_formula_p.html

## Install

`npm install excel-formula-tokenizer -S`

or

`yarn add excel-formula-tokenizer`

## Usage

```js
const {getTokens} = require('excel-formula-tokenizer');

const tokens = getTokens('SUM(1, 2)');

while (tokens.moveNext()) {
  const {value, type, subtype} = tokens.current();

  console.log(`token value:   ${value}`);
  console.log(`token type:    ${type}`);
  console.log(`token subtype: ${subtype}`);
  console.log();
}
```

## License

MIT
