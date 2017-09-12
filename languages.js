module.exports = {
  'en-US': {
    true: 'TRUE',
    false: 'FALSE',
    argumentSeparator: ',',
    decimalSeparator: '.',
    reformatNumberForJsParsing: function(n) {return n;}
  },
  'de-DE': {
    true: 'WAHR',
    false: 'FALSCH',
    argumentSeparator: ';',
    decimalSeparator: ',',
    reformatNumberForJsParsing: function(n) {
      return n.replace(',', '.');
    }
  }
};
