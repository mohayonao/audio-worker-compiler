var esprima = require("esprima");
var estraverse = require("estraverse");
var escodegen = require("escodegen");

var AudioWorkerIdentifiers = [
  "onmessage", "postMessage", "close",
  "sampleRate", "addParameter", "removeParameter", "onaudioprocess", "onnodecreate", "parameters",
];

function peek(list) {
  return list[list.length - 1];
}

function compile(code) {
  var ast = esprima.parse(code);
  var scope = [ [] ];

  function isDeclarated(name) {
    return scope.some(function(scope) {
      return scope.indexOf(name) !== -1;
    });
  }

  ast = estraverse.replace(ast, {
    enter: function(node, parent) {
      if (node.type === "VariableDeclarator") {
        peek(scope).push(node.id.name);
      }
      if (node.type === "FunctionDeclaration") {
        peek(scope).push(node.id.name);
        scope.push(node.params.map(function(param) {
          return param.name;
        }));
      }
      if (node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression") {
        scope.push(node.params.map(function(param) {
          return param.name;
        }));
      }

      if (parent.property !== node && parent.key !== node) {
        if (node.type === "Identifier" && AudioWorkerIdentifiers.indexOf(node.name) !== -1) {
          if (!isDeclarated(node.name)) {
            return { type: "Identifier", name: "self." + node.name };
          }
        }
      }
    },
    leave: function(node) {
      if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression") {
        scope.pop();
      }
    },
  });

  return escodegen.generate(ast);
}

module.exports = { compile: compile };
