const {deepStrictEqual} = require('assert');
const {tokenize} = require('../');

module.exports.itBlock = itBlock;

/**
* @param arg - Array containing [excel formula, expected]
*              where expected is Array of [value, type, subtype] tuples
*/
function itBlock([formula, expected, options]) {
  it(formula, function () {
    const result = tokenize(formula, options);
    assertTokens(result, expected);
  });
}

/**
* @param actual - Array of [{value, type, subtype}] tuples
* @param expected - Array of [value, type, subtype] tuples
*/
function assertTokens(actual, expected) {
  expected = expected.map(tuple => {
    const [value, type, subtype] = tuple;
    return {value, type, subtype};
  });

  deepStrictEqual(actual, expected);
}
