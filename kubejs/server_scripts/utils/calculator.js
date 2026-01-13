PlayerEvents.chat((event) => {
  /** @type {Token[]} */
  var tokens;
  /** @type {NodeExpr} */
  var ast;
  /** @type {any} */
  var result;
  /** @type {string} */
  var error;
  /** @type {string} */
  var message = (message = ("" + event.message).trim());

  if (message.startsWith("=")) {
    message = ("" + message).replace(/^=\s*/, "");

    try {
      tokens = calculatorLex(message);
      ast = calculatorParse(tokens);
      result = calculatorExec(ast);

      if (typeof result === "number") {
        result = result.toFixed(5).replace(/\.?0+$/, "");
        if (result === "-0") result = "0";
      }

      event.player.tell(
        Text.join([
          Text.aqua(message),
          Text.of(" = "),
          Text.green(result),
          Text.gray(" [Click to Copy]"),
        ])
          .clickCopy(result)
          .hover(Text.of("Click to copy"))
      );
    } catch (e) {
      error = e.message || e.toString();
      event.player.tell(
        Text.join([
          Text.red("Error evaluating "),
          Text.aqua(message),
          Text.red(": "),
          Text.gray(error),
        ])
      );
    }
    event.cancel();
  }
});

var calculatorExec = (() => {
  /** @type {Record<string, { arguments?: string[], fn: (...args: any[]) => any }>} */
  var functions = {
    sqrt: {
      arguments: ["number"],
      fn: (value) => Math.sqrt(value),
    },
    floor: {
      arguments: ["number"],
      fn: (value) => Math.floor(value),
    },
    ceil: {
      arguments: ["number"],
      fn: (value) => Math.ceil(value),
    },
    sin: {
      arguments: ["number"],
      fn: (value) => Math.sin(value),
    },
    cos: {
      arguments: ["number"],
      fn: (value) => Math.cos(value),
    },
    ln: {
      arguments: ["number"],
      fn: (value) => JavaMath.log(value),
    },
    log: {
      arguments: ["number", "number"],
      fn: (base, value) => JavaMath.log(value) / JavaMath.log(base),
    },
    log2: {
      arguments: ["number"],
      fn: (value) => JavaMath.log(value) / JavaMath.log(2),
    },
    log10: {
      arguments: ["number"],
      fn: (value) => JavaMath.log10(value),
    },
    min: {
      fn: function () {
        var args = Array.from(arguments);
        if (args.length === 0) {
          throw new Error(
            "wrong argument count for max: expected 1 or more, got 0"
          );
        }
        if (args.some((a) => typeof a !== "number")) {
          throw new Error("wrong argument types for max: expected all numbers");
        }
        return Math.min.apply(null, args);
      },
    },
    max: {
      fn: function () {
        var args = Array.from(arguments);
        if (args.length === 0) {
          throw new Error(
            "wrong argument count for max: expected 1 or more, got 0"
          );
        }
        if (args.some((a) => typeof a !== "number")) {
          throw new Error("wrong argument types for max: expected all numbers");
        }
        return Math.max.apply(null, args);
      },
    },
  };

  /** @type {Record<string, any>} */
  var constants = {
    e: JavaMath.E,
    pi: JavaMath.PI,
  };

  /**
   * @param {string} name name of the function/operator
   * @param {string[]} expectedArgs the types of arguments this check
   * @param {any[]} args the arguments
   */
  function validateArguments(name, expectedArgs, args) {
    var argTypes;
    if (expectedArgs.length !== args.length) {
      throw new Error(
        "wrong arguments count for " +
          name +
          ": expected " +
          expectedArgs.length +
          ", got " +
          args.length
      );
    }
    argTypes = args.map((arg) => typeof arg);
    if (argTypes.every((arg, i) => arg === expectedArgs[i])) return;

    throw new Error(
      "wrong argument types for " +
        name +
        ": expected [" +
        expectedArgs.join(", ") +
        "], got [" +
        argTypes.join(", ") +
        "]"
    );
  }

  /**
   * @param {NodeExpr} node
   * @returns {any}
   */
  function calculate(node) {
    var left, right, fn, args, constant;

    switch (node.type) {
      case "binOp":
        left = calculate(node.left);
        right = calculate(node.right);
        switch (node.operator) {
          case "+":
            validateArguments("addition", ["number", "number"], [left, right]);
            return left + right;
          case "-":
            validateArguments(
              "subtraction",
              ["number", "number"],
              [left, right]
            );
            return left - right;
          case "*":
            validateArguments(
              "multiplication",
              ["number", "number"],
              [left, right]
            );
            return left * right;
          case "/":
            validateArguments("division", ["number", "number"], [left, right]);
            return left / right;
          case "^":
            validateArguments(
              "exponentiation",
              ["number", "number"],
              [left, right]
            );
            return Math.pow(left, right);
        }
      case "call":
        fn = functions[node.identifier];
        if (!fn) {
          throw new Error("unknown identifier " + node.identifier);
        }
        args = node.arguments.map((arg) => calculate(arg));
        if (fn.arguments) {
          validateArguments(node.identifier, fn.arguments, args);
        }
        return fn.fn.apply(null, args);
      case "number":
        return node.value;
      case "const":
        constant = constants[node.identifier];
        if (!constant) {
          throw new Error("unknown identifier " + node.identifier);
        }
        return constant;
      default:
        throw new Error("unknown node type " + node.type);
    }
  }

  return calculate;
})();

var token_operator = ["**", "*", "/", "+", "-", "^"];

/**
 * @typedef {{ t: "(" }} TokenLParen
 * @typedef {{ t: ")" }} TokenRParen
 * @typedef {{ t: "*" }} TokenTimes
 * @typedef {{ t: "/" }} TokenSlash
 * @typedef {{ t: "+" }} TokenPlus
 * @typedef {{ t: "-" }} TokenDash
 * @typedef {{ t: "," }} TokenComma
 * @typedef {{ t: "eof" }} TokenEof
 * @typedef {{ t: "^", v: "^" | "**" }} TokenExp
 * @typedef {{ t: "ident", v: string }} TokenIdent
 * @typedef {{ t: "number", v: number }} TokenNumber
 * @typedef {TokenLParen | TokenRParen | TokenTimes | TokenSlash | TokenPlus | TokenDash | TokenComma | TokenEof | TokenExp | TokenIdent | TokenNumber} Token
 */

/**
 * @param {string} input the source text
 * @returns {Token[]} an array of tokens
 */
function calculatorLex(input) {
  /** @type {Token[]} */
  var tokens = [];
  var index = 0;
  var token;

  /** @returns {string | null} */
  function next() {
    if (index > input.length) {
      return null;
    }
    var ch = input.substring(index, index + 1) || null;
    index += 1;
    return ch;
  }

  function prev() {
    index -= 1;
  }

  /** @returns {Token | null} */
  function lexToken() {
    var ch = next();
    if (!ch) {
      return null;
    }

    while (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      ch = next();
    }
    if (ch.match(/^[a-zA-Z_]$/)) {
      return lexIdent();
    }
    if (ch.match(/^[0-9]$/)) {
      return lexNumber();
    }
    switch (ch) {
      case "(":
        return { t: "(" };
      case ")":
        return { t: ")" };
      case "+":
        return { t: "+" };
      case "-":
        return { t: "-" };
      case "*":
        ch = next();
        if (ch == "*") {
          return { t: "^", v: "**" };
        }
        prev();
        return { t: "*" };
      case "/":
        return { t: "/" };
      case "^":
        return { t: "^", v: "^" };
      case ",":
        return { t: "," };
      default:
        throw new Error("unexpected token: '" + ch + "'");
    }
  }

  /** @returns {Token | null} */
  function lexIdent() {
    var ch, pos, text;
    pos = index - 1;
    while ((ch = next()) && ch.match(/^[a-zA-Z0-9_]$/));
    prev();
    text = input.substring(pos, index);
    return { t: "ident", v: text };
  }

  /** @returns {Token | null} */
  function lexNumber() {
    var ch, pos, text;
    pos = index - 1;
    while ((ch = next()) && ch.match(/^[0-9]$/));
    if (ch === ".") {
      while ((ch = next()) && ch.match(/^[0-9]$/));
    }
    prev();
    text = input.substring(pos, index);
    return { t: "number", v: parseFloat(text) };
  }

  while (true) {
    token = lexToken();
    if (!token) break;
    tokens.push(token);
  }
  tokens.push({ t: "eof" });
  return tokens;
}

/**
 * @typedef {"*" | "/" | "+" | "-" | "^"} BinaryOperator
 * @typedef {"+" | "-"} UnaryOperator
 * @typedef {{ type: "binOp", operator: BinaryOperator, left: NodeExpr, right: NodeExpr }} NodeExprBinary
 * @typedef {{ type: "unOp", operator: UnaryOperator, value: NodeExpr }} NodeExprUnary
 * @typedef {{ type: "call", identifier: string, arguments: NodeExpr[] }} NodeExprCall
 * @typedef {{ type: "const", identifier: string }} NodeConstant
 * @typedef {{ type: "number", value: number }} NodeLiteralNumber
 * @typedef {NodeExprBinary | NodeExprUnary | NodeExprCall | NodeConstant | NodeLiteralNumber} NodeExpr
 */

/**
 * @param {Token[]} tokens lexed tokens
 * @returns {NodeExpr}
 */
function calculatorParse(tokens) {
  /** @type {NodeExpr} */
  var result;
  var index = 0;
  /** @type {Record<"*" | "/" | "+" | "-" | "^", { prec: number, assoc: "left" | "right" }>} */
  var operators = {
    "*": { prec: 3, assoc: "left" },
    "/": { prec: 3, assoc: "left" },
    "+": { prec: 2, assoc: "left" },
    "-": { prec: 2, assoc: "left" },
    "^": { prec: 4, assoc: "right" },
  };

  /**
   * @param {Token} token
   * @returns {string}
   */
  function prettyToken(token) {
    switch (token.t) {
      case "(":
        return "'('";
      case ")":
        return "')'";
      case "+":
        return "'+'";
      case "-":
        return "'-'";
      case "*":
        return "'*'";
      case "/":
        return "'/'";
      case "^":
        return "'" + token.v + "'";
      case ",":
        return "','";
      case "number":
        return "number ('" + token.v + "')";
      case "ident":
        return "indentifier ('" + token.v + "')";
      case "eof":
        return "eof";
    }
  }

  /** @returns {Token} */
  function current() {
    return tokens[index - 1];
  }

  /** @returns {Token} */
  function next() {
    if (index >= tokens.length) {
      throw new Error("eof");
    }
    return tokens[index];
  }

  /**
   * @param {Token["t"]} token
   * @returns {boolean}
   */
  function peek(token) {
    return next().t === token;
  }

  /**
   * @param {Token["t"]} token
   * @returns {boolean}
   */
  function accept(token) {
    if (peek(token)) {
      index += 1;
      return true;
    }
    return false;
  }

  /**
   * @param {Token["t"]} token
   * @returns {void}
   */
  function expect(token) {
    if (!accept(token)) {
      throw new Error(
        "expected " + token + " got " + prettyToken(next()) + " instead"
      );
    }
  }

  /** @returns {NodeExpr} */
  function parseExpression() {
    return parseBinOp(0);
  }

  /**
   * @param {Token["t"]} token
   * @returns {token is BinaryOperator}
   */
  function isBinaryOperator(token) {
    return !!operators[token];
  }

  /**
   * @param {number} prec
   * @returns {NodeExpr}
   */
  function parseBinOp(prec) {
    var left = parseUnOp();
    /** @type {NodeExpr} */
    var right;
    /** @type {Token["t"]} */
    var op, tprec;

    while (
      (op = next().t) &&
      isBinaryOperator(op) &&
      operators[op].prec > prec
    ) {
      accept(op);
      tprec = operators[op].prec;
      if (operators[op].assoc === "right") tprec -= 1;
      right = parseBinOp(tprec);
      left = { type: "binOp", operator: op, left: left, right: right };
    }

    return left;
  }

  /** @returns {NodeExpr} */
  function parseUnOp() {
    var op;
    switch ((op = next().t)) {
      case "+":
      case "-":
        accept(op);
        return { type: "unOp", operator: op, value: parseUnOp() };
    }
    return parseTerm();
  }

  /** @returns {NodeExpr[]} */
  function parseArgList() {
    var args = [];
    expect("(");
    while (true) {
      if (accept(")")) {
        return args;
      }
      args.push(parseExpression());
      if (accept(",")) {
        continue;
      }
      expect(")");
      break;
    }
    return args;
  }

  /** @returns {NodeExpr} */
  function parseTerm() {
    var expr, ident, args, number;

    if (accept("(")) {
      expr = parseExpression();
      expect(")");
      return expr;
    }

    if (accept("ident")) {
      // prettier-ignore
      ident = (/** @type {TokenIdent} */ (current())).v;
      if (peek("(")) {
        args = parseArgList();
        return { type: "call", identifier: ident, arguments: args };
      }
      return { type: "const", identifier: ident };
    }

    if (accept("number")) {
      // prettier-ignore
      number = (/** @type {TokenNumber} */ (current())).v;
      return { type: "number", value: number };
    }

    throw new Error("expected (, identifier or number");
  }

  result = parseExpression();
  expect("eof");
  return result;
}
