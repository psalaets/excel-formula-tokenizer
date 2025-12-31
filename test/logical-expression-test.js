const { itBlock } = require('./test-helper');

describe('logical expressions', function () {
  [
    ['TRUE', [['TRUE', 'operand', 'logical']]],
    ['FALSE', [['FALSE', 'operand', 'logical']]]
  ].forEach(itBlock);

  describe('i18n', function () {
    describe('de-DE', function () {
      var options = {
        language: 'de-DE'
      };

      [
        ['WAHR', [['TRUE', 'operand', 'logical']], options],
        ['FALSCH', [['FALSE', 'operand', 'logical']], options]
      ].forEach(itBlock);
    });

    describe('fr-FR', function () {
      var options = {
        language: 'fr-FR'
      };

      [
        ['VRAI', [['TRUE', 'operand', 'logical']], options],
        ['FAUX', [['FALSE', 'operand', 'logical']], options]
      ].forEach(itBlock);
    });
  });
});
