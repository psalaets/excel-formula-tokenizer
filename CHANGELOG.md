# Change Log

All notable changes to this project will be documented in this file.

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
