const {itBlock} = require('./test-helper');

describe('range operators', function () {
  [
    ['A1:C1,A2:C2', [
      ['A1:C1', 'operand', 'range'],
      [',', 'operator-infix', 'union'],
      ['A2:C2', 'operand', 'range']
    ]],
    ['A1:C1 A2:C2', [
      ['A1:C1', 'operand', 'range'],
      // should value be <space> here?
      ['', 'operator-infix', 'intersect'],
      ['A2:C2', 'operand', 'range']
    ]],
  ]
  .forEach(itBlock);
});
