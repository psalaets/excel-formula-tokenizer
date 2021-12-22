module.exports = {
  'en-US': {
    // value for true
    true: 'TRUE',
    // value for false
    false: 'FALSE',
    // separates function arguments
    argumentSeparator: ',',
    // decimal point in numbers
    decimalSeparator: '.',
    // returns number string that can be parsed by Number()
    reformatNumberForJsParsing: function (n) {
      return n;
    }
  },
  'de-DE': {
    true: 'WAHR',
    false: 'FALSCH',
    argumentSeparator: ';',
    decimalSeparator: ',',
    reformatNumberForJsParsing: function (n) {
      return n.replace(',', '.');
    }
  }
};
