# Change Log

All notable changes to this project will be documented in this file.

## [3.0.0] - 2022-01-04

Thanks to [@jlaramie](https://github.com/jlaramie) for all these changes.

### Breaking

- Changes to array output. See `test/arrays-test.js`.

### Added

- Definition for a generic en-EU language.
- `options.preserveLanguage` to keep language-specific delimiters as well as TRUE/FALSE values
- `options.asClass` - To return `Tokens` instance instead of `Tokens[]`.
- Improved compatibility with other libraries

### Fixed

- [#6](https://github.com/psalaets/excel-formula-tokenizer/issues/6) - Quotes around named ranges with spaces are not
  preserved
- [#8](https://github.com/psalaets/excel-formula-tokenizer/issues/8) - Vertical range separator always being , instead
  of ; in the tokens

## [2.4.0] - 2021-12-27

### Fixed

- Big i18n fix (courtesy of [@jlaramie](https://github.com/jlaramie) in
  [#4](https://github.com/psalaets/excel-formula-tokenizer/pull/4))

## [2.3.1] - 2020-04-29

### Fixed

- Fixed issue with parsing scientific numbers that caused problems with whitespace.

## [2.3.0] - 2017-09-11

### Added

- Support for different languages/locales (not really, it's broken)

## [2.2.0] - 2017-08-30

### Added

- TypeScript support

## [2.0.1] - 2017-04-29

### Fixed

- Range intersection operator is now represented as a single space (was: empty string)

## [2.0.0] - 2017-04-29

### Breaking changes

- Tokenizer function now exported as `tokenize`
- `tokenize()` returns Array of tokens

## [1.0.0] - 2017-04-23

### Added

- Original impl brought over from http://ewbi.blogs.com/develops/2004/12/excel_formula_p.html
- Tests

### Fixed

- Issue with "All cells in row(s)" ranges, e.g. `5:10`
