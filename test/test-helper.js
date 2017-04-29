const {deepStrictEqual} = require('assert');
const {tokenize} = require('../');

module.exports.itBlock = itBlock;

/**
* @param arg - Array containing [excel formula, expected]
*              where expected is Array of [value, type, subtype] tuples
*/
function itBlock([formula, expected, options = {}]) {
  let itFunc = it;

  if (options.only) {
    itFunc = it.only;
  } else if (options.skip) {
    itFunc = it.skip;
  }

  itFunc(formula, function () {
    const result = tokenize(formula);
    assertTokens(result, expected);
  });
}

/**
* @param tokens - value from getTokens
* @param expected - Array of [value, type, subtype] tuples
*/
function assertTokens(tokens, expected) {
  deepStrictEqual(toArray(tokens), expected);
}

function toArray(tokens) {
  const array = [];

  while (tokens.moveNext()) {
    const {value, type, subtype} = tokens.current();
    array.push([value, type, subtype]);
  }

  return array;
}
