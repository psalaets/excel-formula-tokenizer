var languages = require('./languages');

var TOK_TYPE_NOOP = 'noop';
var TOK_TYPE_OPERAND = 'operand';
var TOK_TYPE_FUNCTION = 'function';
var TOK_TYPE_SUBEXPR = 'subexpression';
var TOK_TYPE_ARGUMENT = 'argument';
var TOK_TYPE_OP_PRE = 'operator-prefix';
var TOK_TYPE_OP_IN = 'operator-infix';
var TOK_TYPE_OP_POST = 'operator-postfix';
var TOK_TYPE_WSPACE = 'white-space';
var TOK_TYPE_UNKNOWN = 'unknown';

var TOK_SUBTYPE_START = 'start';
var TOK_SUBTYPE_STOP = 'stop';

var TOK_SUBTYPE_TEXT = 'text';
var TOK_SUBTYPE_NUMBER = 'number';
var TOK_SUBTYPE_LOGICAL = 'logical';
var TOK_SUBTYPE_ERROR = 'error';
var TOK_SUBTYPE_RANGE = 'range';

var TOK_SUBTYPE_MATH = 'math';
var TOK_SUBTYPE_CONCAT = 'concatenate';
var TOK_SUBTYPE_INTERSECT = 'intersect';
var TOK_SUBTYPE_UNION = 'union';

var TOK_VALUE_ARRAY = 'ARRAY';
var TOK_VALUE_ARRAYROW = 'ARRAYROW';
var TOK_VALUE_TRUE = 'TRUE';
var TOK_VALUE_FALSE = 'FALSE';

var TYPES = {
  TOK_TYPE_NOOP: TOK_TYPE_NOOP,
  TOK_TYPE_OPERAND: TOK_TYPE_OPERAND,
  TOK_TYPE_FUNCTION: TOK_TYPE_FUNCTION,
  TOK_TYPE_SUBEXPR: TOK_TYPE_SUBEXPR,
  TOK_TYPE_ARGUMENT: TOK_TYPE_ARGUMENT,
  TOK_TYPE_OP_PRE: TOK_TYPE_OP_PRE,
  TOK_TYPE_OP_IN: TOK_TYPE_OP_IN,
  TOK_TYPE_OP_POST: TOK_TYPE_OP_POST,
  TOK_TYPE_WHITE_SPACE: TOK_TYPE_WSPACE,
  TOK_TYPE_WSPACE: TOK_TYPE_WSPACE,
  TOK_TYPE_UNKNOWN: TOK_TYPE_UNKNOWN,
  TOK_SUBTYPE_START: TOK_SUBTYPE_START,
  TOK_SUBTYPE_STOP: TOK_SUBTYPE_STOP,
  TOK_SUBTYPE_TEXT: TOK_SUBTYPE_TEXT,
  TOK_SUBTYPE_NUMBER: TOK_SUBTYPE_NUMBER,
  TOK_SUBTYPE_LOGICAL: TOK_SUBTYPE_LOGICAL,
  TOK_SUBTYPE_ERROR: TOK_SUBTYPE_ERROR,
  TOK_SUBTYPE_RANGE: TOK_SUBTYPE_RANGE,
  TOK_SUBTYPE_MATH: TOK_SUBTYPE_MATH,
  TOK_SUBTYPE_CONCAT: TOK_SUBTYPE_CONCAT,
  TOK_SUBTYPE_INTERSECT: TOK_SUBTYPE_INTERSECT,
  TOK_SUBTYPE_UNION: TOK_SUBTYPE_UNION,
  TOK_VALUE_ARRAY: TOK_VALUE_ARRAY,
  TOK_VALUE_ARRAYROW: TOK_VALUE_ARRAYROW,
  TOK_VALUE_TRUE: TOK_VALUE_TRUE,
  TOK_VALUE_FALSE: TOK_VALUE_FALSE
};

var NEWLINE_MATCHER = /(\r|\n)+/g;

function createToken(value, type, subtype = '') {
  return { value, type, subtype };
}

class Tokens {
  constructor() {
    this.items = [];
    this.index = -1;
  }

  add(value, type, subtype) {
    const token = createToken(value, type, subtype);
    this.addRef(token);
    return token;
  }

  addRef(token) {
    this.items.push(token);
  }

  reset() {
    this.index = -1;
  }

  BOF() {
    return this.index <= 0;
  }

  EOF() {
    return this.index >= this.items.length - 1;
  }

  moveNext() {
    if (this.EOF()) return false;
    this.index++;
    return true;
  }

  current() {
    if (this.index == -1) return null;
    return this.items[this.index];
  }

  next() {
    if (this.EOF()) return null;
    return this.items[this.index + 1];
  }

  previous() {
    if (this.index < 1) return null;
    return this.items[this.index - 1];
  }

  toArray() {
    return this.items;
  }
}

class TokenStack {
  constructor() {
    this.items = [];
  }

  push(token) {
    this.items.push(token);
  }

  pop(name) {
    const token = this.items.pop();
    return createToken(name || '', token.type, TOK_SUBTYPE_STOP);
  }

  token() {
    if (this.items.length > 0) {
      return this.items[this.items.length - 1];
    } else {
      return null;
    }
  }

  value() {
    return this.token() ? this.token().value : '';
  }

  type() {
    return this.token() ? this.token().type : '';
  }

  subtype() {
    return this.token() ? this.token().subtype : '';
  }
}

/**
 * Takes in a formula and parses it into a stack of tokens representing the structure
 * @param {string} formula
 * @param {Object} options
 * @param {string} [options.language] - Defaults to en-US
 * @param {boolean} [options.preserveLanguage] - Defaults to false. When true language specific characters will be written to the token output instead of being normalized.
 * @param {boolean} [options.asClass] - Defaults to false. When true tokenize will reutrn the instantiated Tokens class instead of calling Tokens.toArray().
 * @returns {Token[]|Tokens} - If options.asClass is true then the Tokens class gets return. Otherwise this returns an array of Token objects.
 */
function tokenize(formula, options) {
  options = options || {};
  options.language = options.language || 'en-US';

  var language = languages[options.language];
  if (!language) {
    var msg =
      'Unsupported language ' + options.language + '. Expected one of: ' + Object.keys(languages).sort().join(', ');
    throw new Error(msg);
  }

  var tokens = new Tokens();
  var tokenStack = new TokenStack();

  var offset = 0;
  var token = '';

  var currentChar = function () {
    return formula.substr(offset, 1);
  };
  var doubleChar = function () {
    return formula.substr(offset, 2);
  };
  var nextChar = function () {
    return formula.substr(offset + 1, 1);
  };
  var EOF = function () {
    return offset >= formula.length;
  };
  var isPreviousNonDigitBlank = function () {
    var offsetCopy = offset;
    if (offsetCopy == 0) return true;

    while (offsetCopy > 0) {
      if (!/\d/.test(formula[offsetCopy])) {
        return /\s/.test(formula[offsetCopy]);
      }

      offsetCopy -= 1;
    }
    return false;
  };

  var isNextNonDigitTheRangeOperator = function () {
    var offsetCopy = offset;

    while (offsetCopy < formula.length) {
      if (!/\d/.test(formula[offsetCopy])) {
        return /:/.test(formula[offsetCopy]);
      }

      offsetCopy += 1;
    }
    return false;
  };

  var checkAndAddToken = function (value, type, subtype) {
    const cleanedToken = value.replace(NEWLINE_MATCHER, '');

    // Clear regardless
    token = '';

    if (cleanedToken.length > 0) {
      return tokens.add(cleanedToken, type, subtype);
    }

    return false;
  };

  var inString = false;
  var inPath = false;
  var inRange = false;
  var inError = false;
  var inNumeric = false;

  while (formula.length > 0) {
    if (formula.substr(0, 1) == ' ') {
      formula = formula.substr(1);
    } else {
      if (formula.substr(0, 1) == '=') {
        formula = formula.substr(1);
      }
      break;
    }
  }

  while (!EOF()) {
    // state-dependent character evaluation (order is important)

    // double-quoted strings
    // embeds are doubled
    // end marks token

    if (inString) {
      if (currentChar() == '"') {
        if (nextChar() == '"') {
          token += '"';
          offset += 1;
        } else {
          inString = false;
          tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_TEXT);
          token = '';
        }
      } else {
        token += currentChar();
      }
      offset += 1;
      continue;
    }

    // single-quoted strings (links)
    // embeds are double
    // end does not mark a token

    if (inPath) {
      if (currentChar() == "'") {
        if (nextChar() == "'") {
          token += "'";
          offset += 1;
        } else {
          inPath = false;
          token += "'";
        }
      } else {
        token += currentChar();
      }
      offset += 1;
      continue;
    }

    // bracked strings (range offset or linked workbook name)
    // no embeds (changed to "()" by Excel)
    // end does not mark a token

    if (inRange) {
      if (currentChar() == ']') {
        inRange = false;
      }
      token += currentChar();
      offset += 1;
      continue;
    }

    // error values
    // end marks a token, determined from absolute list of values

    if (inError) {
      token += currentChar();
      offset += 1;
      if (',#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,'.indexOf(',' + token + ',') != -1) {
        inError = false;
        tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_ERROR);
        token = '';
      }
      continue;
    }

    if (inNumeric) {
      if ([language.decimalSeparator, 'E'].indexOf(currentChar()) != -1 || /\d/.test(currentChar())) {
        token += currentChar();

        offset += 1;
        continue;
      } else if ('+-'.indexOf(currentChar()) != -1 && language.isScientificNotation(token)) {
        token += currentChar();

        offset += 1;
        continue;
      } else {
        inNumeric = false;
        var jsValue = options.preserveLanguage ? token : language.reformatNumberForJsParsing(token);
        tokens.add(jsValue, TOK_TYPE_OPERAND, TOK_SUBTYPE_NUMBER);
        token = '';
      }
    }

    // scientific notation check

    if ('+-'.indexOf(currentChar()) != -1) {
      if (token.length > 1) {
        if (language.isScientificNotation(token)) {
          token += currentChar();
          offset += 1;
          continue;
        }
      }
    }

    // independent character evaulation (order not important)

    // function, subexpression, array parameters

    if (
      currentChar() == language.argumentSeparator &&
      [TOK_VALUE_ARRAY, TOK_VALUE_ARRAYROW].indexOf(tokenStack.value()) == -1
    ) {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      if (tokenStack.type() == TOK_TYPE_FUNCTION) {
        tokens.add(options.preserveLanguage ? language.argumentSeparator : ',', TOK_TYPE_ARGUMENT);

        offset += 1;
        continue;
      }
    }

    if (currentChar() == language.horizontalSeparator) {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      if (tokenStack.type() == TOK_TYPE_FUNCTION) {
        tokens.add(options.preserveLanguage ? language.argumentSeparator : ',', TOK_TYPE_ARGUMENT);
      } else {
        tokens.add(currentChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_UNION);
      }

      offset += 1;
      continue;
    }

    // establish state-dependent character evaluations

    if (/\d/.test(currentChar()) && (!token || isPreviousNonDigitBlank()) && !isNextNonDigitTheRangeOperator()) {
      inNumeric = true;
      token += currentChar();
      offset += 1;
      continue;
    }

    if (currentChar() == '"') {
      // not expected
      checkAndAddToken(token, TOK_TYPE_UNKNOWN);

      inString = true;
      offset += 1;
      continue;
    }

    if (currentChar() == "'") {
      // not expected
      checkAndAddToken(token, TOK_TYPE_UNKNOWN);

      token = "'";
      inPath = true;
      offset += 1;
      continue;
    }

    if (currentChar() == '[') {
      inRange = true;
      token += currentChar();
      offset += 1;
      continue;
    }

    if (currentChar() == '#') {
      // not expected
      checkAndAddToken(token, TOK_TYPE_UNKNOWN);

      inError = true;
      token += currentChar();
      offset += 1;
      continue;
    }

    // mark start and end of arrays and array rows

    if (currentChar() == '{') {
      // not expected
      checkAndAddToken(token, TOK_TYPE_UNKNOWN);

      tokenStack.push(tokens.add(TOK_VALUE_ARRAY, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
      tokenStack.push(tokens.add(TOK_VALUE_ARRAYROW, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
      offset += 1;
      continue;
    }

    if (currentChar() == language.verticalSeparator) {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.addRef(tokenStack.pop(TOK_VALUE_ARRAYROW));

      if (tokenStack.type() == TOK_TYPE_FUNCTION) {
        tokens.add(';', TOK_TYPE_ARGUMENT);
      }

      tokenStack.push(tokens.add(TOK_VALUE_ARRAYROW, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
      offset += 1;
      continue;
    }

    if (currentChar() == '}') {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.addRef(tokenStack.pop(TOK_VALUE_ARRAYROW));
      tokens.addRef(tokenStack.pop(TOK_VALUE_ARRAY));
      offset += 1;
      continue;
    }

    // trim white-space

    if (currentChar() == ' ') {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.add(currentChar(), TOK_TYPE_WSPACE);
      offset += 1;
      while (currentChar() == ' ' && !EOF()) {
        offset += 1;
      }
      continue;
    }

    // multi-character comparators

    if (',>=,<=,<>,'.indexOf(',' + doubleChar() + ',') != -1) {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.add(doubleChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_LOGICAL);
      offset += 2;
      continue;
    }

    // standard infix operators

    if ('+-*/^&=><'.indexOf(currentChar()) != -1) {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.add(currentChar(), TOK_TYPE_OP_IN);
      offset += 1;
      continue;
    }

    // standard postfix operators

    if ('%'.indexOf(currentChar()) != -1) {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.add(currentChar(), TOK_TYPE_OP_POST);
      offset += 1;
      continue;
    }

    // start subexpression or function

    if (currentChar() == '(') {
      const newToken = checkAndAddToken(token, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START);
      if (newToken) {
        tokenStack.push(newToken);
      } else {
        tokenStack.push(tokens.add('', TOK_TYPE_SUBEXPR, TOK_SUBTYPE_START));
      }
      offset += 1;
      continue;
    }

    // stop subexpression

    if (currentChar() == ')') {
      checkAndAddToken(token, TOK_TYPE_OPERAND);

      tokens.addRef(tokenStack.pop());
      offset += 1;
      continue;
    }

    // token accumulation

    token += currentChar();
    offset += 1;
  }

  // dump remaining accumulation
  checkAndAddToken(token, TOK_TYPE_OPERAND);

  // move all tokens to a new collection, excluding all unnecessary white-space tokens

  var tokens2 = new Tokens();

  while (tokens.moveNext()) {
    token = tokens.current();

    if (token.type == TOK_TYPE_WSPACE) {
      if (tokens.BOF() || tokens.EOF()) {
        // no-op
      } else if (
        !(
          (tokens.previous().type == TOK_TYPE_FUNCTION && tokens.previous().subtype == TOK_SUBTYPE_STOP) ||
          (tokens.previous().type == TOK_TYPE_SUBEXPR && tokens.previous().subtype == TOK_SUBTYPE_STOP) ||
          tokens.previous().type == TOK_TYPE_OPERAND
        )
      ) {
        // no-op
      } else if (
        !(
          (tokens.next().type == TOK_TYPE_FUNCTION && tokens.next().subtype == TOK_SUBTYPE_START) ||
          (tokens.next().type == TOK_TYPE_SUBEXPR && tokens.next().subtype == TOK_SUBTYPE_START) ||
          tokens.next().type == TOK_TYPE_OPERAND
        )
      ) {
        // no-op
      } else {
        tokens2.add(token.value, TOK_TYPE_OP_IN, TOK_SUBTYPE_INTERSECT);
      }
      continue;
    }

    tokens2.addRef(token);
  }

  // switch infix "-" operator to prefix when appropriate, switch infix "+" operator to noop when appropriate, identify operand
  // and infix-operator subtypes, pull "@" from in front of function names

  while (tokens2.moveNext()) {
    token = tokens2.current();

    if (token.type == TOK_TYPE_OP_IN && token.value == '-') {
      if (tokens2.BOF()) {
        token.type = TOK_TYPE_OP_PRE;
      } else if (
        (tokens2.previous().type == TOK_TYPE_FUNCTION && tokens2.previous().subtype == TOK_SUBTYPE_STOP) ||
        (tokens2.previous().type == TOK_TYPE_SUBEXPR && tokens2.previous().subtype == TOK_SUBTYPE_STOP) ||
        tokens2.previous().type == TOK_TYPE_OP_POST ||
        tokens2.previous().type == TOK_TYPE_OPERAND
      ) {
        token.subtype = TOK_SUBTYPE_MATH;
      } else {
        token.type = TOK_TYPE_OP_PRE;
      }
      continue;
    }

    if (token.type == TOK_TYPE_OP_IN && token.value == '+') {
      if (tokens2.BOF()) {
        token.type = TOK_TYPE_NOOP;
      } else if (
        (tokens2.previous().type == TOK_TYPE_FUNCTION && tokens2.previous().subtype == TOK_SUBTYPE_STOP) ||
        (tokens2.previous().type == TOK_TYPE_SUBEXPR && tokens2.previous().subtype == TOK_SUBTYPE_STOP) ||
        tokens2.previous().type == TOK_TYPE_OP_POST ||
        tokens2.previous().type == TOK_TYPE_OPERAND
      ) {
        token.subtype = TOK_SUBTYPE_MATH;
      } else {
        token.type = TOK_TYPE_NOOP;
      }
      continue;
    }

    if (token.type == TOK_TYPE_OP_IN && token.subtype.length == 0) {
      if ('<>='.indexOf(token.value.substr(0, 1)) != -1) {
        token.subtype = TOK_SUBTYPE_LOGICAL;
      } else if (token.value == '&') {
        token.subtype = TOK_SUBTYPE_CONCAT;
      } else {
        token.subtype = TOK_SUBTYPE_MATH;
      }
      continue;
    }

    if (token.type == TOK_TYPE_OPERAND && token.subtype.length == 0) {
      if (isNaN(Number(language.reformatNumberForJsParsing(token.value)))) {
        if (token.value == language.true) {
          token.subtype = TOK_SUBTYPE_LOGICAL;
          token.value = options.preserveLanguage ? language.true : TOK_VALUE_TRUE;
        } else if (token.value == language.false) {
          token.subtype = TOK_SUBTYPE_LOGICAL;
          token.value = options.preserveLanguage ? language.false : TOK_VALUE_FALSE;
        } else {
          token.subtype = TOK_SUBTYPE_RANGE;
        }
      } else {
        token.subtype = TOK_SUBTYPE_NUMBER;
        token.value = options.preserveLanguage ? token.value : language.reformatNumberForJsParsing(token.value);
      }
      continue;
    }

    if (token.type == TOK_TYPE_FUNCTION) {
      if (token.value.substr(0, 1) == '@') {
        token.value = token.value.substr(1);
      }
      continue;
    }
  }

  tokens2.reset();

  // move all tokens to a new collection, excluding all noops

  tokens = new Tokens();

  while (tokens2.moveNext()) {
    if (tokens2.current().type != TOK_TYPE_NOOP) {
      tokens.addRef(tokens2.current());
    }
  }

  tokens.reset();

  return options.asClass ? tokens : tokens.toArray();
}

module.exports.tokenize = tokenize;
module.exports.TYPES = TYPES;
module.exports.Tokens = Tokens;
module.exports.TokenStack = TokenStack;
