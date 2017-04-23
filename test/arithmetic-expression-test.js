const {itBlock} = require('./test-helper');

describe('arithmetic expressions', function () {
  [
    ['1', [
      ['1', 'operand', 'number']
    ]],
    ['1.5E-10', [
      ['1.5E-10', 'operand', 'number']
    ]],
    ['1 + 2', [
      ['1', 'operand', 'number'],
      ['+', 'operator-infix', 'math'],
      ['2', 'operand', 'number']
    ]],
    ['(1 + 2) - 3', [
      ['', 'subexpression', 'start'],
      ['1', 'operand', 'number'],
      ['+', 'operator-infix', 'math'],
      ['2', 'operand', 'number'],
      ['', 'subexpression', 'stop'],
      ['-', 'operator-infix', 'math'],
      ['3', 'operand', 'number']
    ]],
    ['-1', [
      ['-', 'operator-prefix', ''],
      ['1', 'operand', 'number']
    ]],
    ['+1', [
      ['1', 'operand', 'number']
    ]],
    ['1%', [
      ['1', 'operand', 'number'],
      ['%', 'operator-postfix', ''],
    ]],
    ['-(1 + 2)', [
      ['-', 'operator-prefix', ''],
      ['', 'subexpression', 'start'],
      ['1', 'operand', 'number'],
      ['+', 'operator-infix', 'math'],
      ['2', 'operand', 'number'],
      ['', 'subexpression', 'stop']
    ]],
    ['(1 + 2)%', [
      ['', 'subexpression', 'start'],
      ['1', 'operand', 'number'],
      ['+', 'operator-infix', 'math'],
      ['2', 'operand', 'number'],
      ['', 'subexpression', 'stop'],
      ['%', 'operator-postfix', '']
    ]],
  ]
  .forEach(itBlock);
});
