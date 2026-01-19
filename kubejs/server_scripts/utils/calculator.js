PlayerEvents.chat((event) => {
  /** @type {string} */
  let message = (message = ("" + event.message).trim());

  if (message.startsWith("=")) {
    message = ("" + message).replace(/^=\s*/, "");

    try {
      /** @type {Token[]} */
      let tokens = calculatorLex(message);
      /** @type {NodeExpr} */
      let ast = calculatorParse(tokens);
      /** @type {any} */
      let result = calculatorExec(ast);

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
      /** @type {string} */
      let error = e.message || e.toString();
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

let calculatorExec = (() => {
  /** @type {Record<string, { arguments?: string[], fn: (...args: any[]) => any }>} */
  let functions = {
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
        let args = Array.from(arguments);
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
        let args = Array.from(arguments);
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
  let constants = {
    e: JavaMath.E,
    pi: JavaMath.PI,
  };

  /**
   * @param {string} name name of the function/operator
   * @param {string[]} expectedArgs the types of arguments this check
   * @param {any[]} args the arguments
   */
  function validateArguments(name, expectedArgs, args) {
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
    let argTypes = args.map((arg) => typeof arg);
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
    switch (node.type) {
      case "binOp": {
        let left = calculate(node.left);
        let right = calculate(node.right);
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
          case "//":
            validateArguments(
              "floor division",
              ["number", "number"],
              [left, right]
            );
            return Math.floor(left / right);
          case "%":
            validateArguments("modulo", ["number", "number"], [left, right]);
            return left % right;
          case "^":
            validateArguments(
              "exponentiation",
              ["number", "number"],
              [left, right]
            );
            return Math.pow(left, right);
        }
      }
      case "call": {
        let fn = functions[node.identifier];
        if (!fn) {
          throw new Error("unknown identifier " + node.identifier);
        }
        let args = node.arguments.map((arg) => calculate(arg));
        if (fn.arguments) {
          validateArguments(node.identifier, fn.arguments, args);
        }
        return fn.fn.apply(null, args);
      }
      case "number": {
        return node.value;
      }
      case "const": {
        let constant = constants[node.identifier];
        if (!constant) {
          throw new Error("unknown identifier " + node.identifier);
        }
        return constant;
      }
      default: {
        throw new Error("unknown node type " + node.type);
      }
    }
  }

  return calculate;
})();

/**
 * @typedef {{ t: "(" }} TokenLParen
 * @typedef {{ t: ")" }} TokenRParen
 * @typedef {{ t: "*" }} TokenTimes
 * @typedef {{ t: "/" }} TokenSlash
 * @typedef {{ t: "//" }} TokenDSlash
 * @typedef {{ t: "%" }} TokenMod
 * @typedef {{ t: "+" }} TokenPlus
 * @typedef {{ t: "-" }} TokenDash
 * @typedef {{ t: "," }} TokenComma
 * @typedef {{ t: "eof" }} TokenEof
 * @typedef {{ t: "^", v: "^" | "**" }} TokenExp
 * @typedef {{ t: "ident", v: string }} TokenIdent
 * @typedef {{ t: "number", v: number }} TokenNumber
 * @typedef {TokenLParen | TokenRParen | TokenTimes | TokenSlash | TokenDSlash | TokenMod | TokenPlus | TokenDash | TokenComma | TokenEof | TokenExp | TokenIdent | TokenNumber} Token
 */

/**
 * @param {string} input the source text
 * @returns {Token[]} an array of tokens
 */
function calculatorLex(input) {
  /** @type {Token[]} */
  let tokens = [];
  let index = 0;

  while (true) {
    let token = lexToken();
    if (!token) break;
    tokens.push(token);
  }
  tokens.push({ t: "eof" });
  return tokens;

  /** @returns {string | null} */
  function next() {
    if (index > input.length) {
      return null;
    }
    let ch = input.substring(index, index + 1) || null;
    index += 1;
    return ch;
  }

  function prev() {
    index -= 1;
  }

  /** @returns {Token | null} */
  function lexToken() {
    let ch = next();
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
        ch = next();
        if (ch == "/") {
          return { t: "//" };
        }
        prev();
        return { t: "/" };
      case "%":
        return { t: "%" };
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
    let pos = index - 1;
    let ch;
    while ((ch = next()) && ch.match(/^[a-zA-Z0-9_]$/));
    prev();
    let text = input.substring(pos, index);
    return { t: "ident", v: text };
  }

  /** @returns {Token | null} */
  function lexNumber() {
    let pos = index - 1;
    let ch;
    while ((ch = next()) && ch.match(/^[0-9]$/));
    if (ch === ".") {
      while ((ch = next()) && ch.match(/^[0-9]$/));
    }
    prev();
    let text = input.substring(pos, index);
    return { t: "number", v: parseFloat(text) };
  }
}

/**
 * @typedef {"*" | "/" | "+" | "-" | "^" | "%" | "//"} BinaryOperator
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
  /** @type {Record<"*" | "/" | "+" | "-" | "^", { prec: number, assoc: "left" | "right" }>} */
  let operators = {
    "*": { prec: 3, assoc: "left" },
    "/": { prec: 3, assoc: "left" },
    "//": { prec: 3, assoc: "left" },
    "%": { prec: 3, assoc: "left" },
    "+": { prec: 2, assoc: "left" },
    "-": { prec: 2, assoc: "left" },
    "^": { prec: 4, assoc: "right" },
  };

  let index = 0;

  /** @type {NodeExpr} */
  let result = parseExpression();
  expect("eof");
  return result;

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
      case "//":
        return "'//'";
      case "%":
        return "'%'";
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
    let left = parseUnOp();
    /** @type {Token["t"]} */
    let op;
    while (
      (op = next().t) &&
      isBinaryOperator(op) &&
      operators[op].prec > prec
    ) {
      accept(op);
      let tprec = operators[op].prec;
      if (operators[op].assoc === "right") tprec -= 1;
      let right = parseBinOp(tprec);
      left = { type: "binOp", operator: op, left: left, right: right };
    }

    return left;
  }

  /** @returns {NodeExpr} */
  function parseUnOp() {
    /** @type {Token["t"]} */
    let op;
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
    let args = [];
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
    if (accept("(")) {
      let expr = parseExpression();
      expect(")");
      return expr;
    }

    if (accept("ident")) {
      // prettier-ignore
      let ident = (/** @type {TokenIdent} */ (current())).v;
      if (peek("(")) {
        let args = parseArgList();
        return { type: "call", identifier: ident, arguments: args };
      }
      return { type: "const", identifier: ident };
    }

    if (accept("number")) {
      // prettier-ignore
      let number = (/** @type {TokenNumber} */ (current())).v;
      return { type: "number", value: number };
    }

    throw new Error("expected (, identifier or number");
  }
}
