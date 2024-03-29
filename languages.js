module.exports = {
  'en-US': {
    // value for true
    true: 'TRUE',
    // value for false
    false: 'FALSE',
    // separates vertical data
    verticalSeparator: ';',
    // separates horizatonal data
    horizontalSeparator: ',',
    // separates function arguments
    argumentSeparator: ',',
    // decimal point in numbers
    decimalSeparator: '.',
    // returns number string that can be parsed by Number()
    reformatNumberForJsParsing: function (n) {
      return n;
    },
    isScientificNotation: function (token) {
      return /^[1-9]{1}(\.[0-9]+)?E{1}$/.test(token);
    }
  },
  'de-DE': {
    true: 'WAHR',
    false: 'FALSCH',
    verticalSeparator: ';',
    horizontalSeparator: '.',
    argumentSeparator: ';',
    decimalSeparator: ',',
    reformatNumberForJsParsing: function (n) {
      return n.replace(',', '.');
    },
    isScientificNotation: function (token) {
      return /^[1-9]{1}(,[0-9]+)?E{1}$/.test(token);
    }
  },
  'en-EU': {
    verticalSeparator: ';',
    horizontalSeparator: '.',
    argumentSeparator: ';',
    decimalSeparator: ',',
    reformatNumberForJsParsing: function (n) {
      return n.replace(',', '.');
    },
    isScientificNotation: function (token) {
      return /^[1-9]{1}(,[0-9]+)?E{1}$/.test(token);
    }
  }
};
