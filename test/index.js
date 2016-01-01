const assert = require("assert");
const esprima = require("esprima");
const escodegen = require("escodegen");
const compiler = require("../");

function format(code) {
  return escodegen.generate(esprima.parse(code));
}

describe("compiler.compile(code: string): string", () => {
  it("appends 'self' to identifiers defined in the global scope", () => {
    var actual = compiler.compile(`
      onmessage = (e) => {
        console.log(e.data, sampleRate);
      };
    `);
    var expected = format(`
      self.onmessage = (e) => {
        console.log(e.data, self.sampleRate);
      };
    `);

    assert(actual === expected);
  });
  it("do nothing to properties", () => {
    var actual = compiler.compile(`
      self.onmessage = (e) => {
        console.log(e.data, e.sampleRate);
      };
    `);
    var expected = format(`
      self.onmessage = (e) => {
        console.log(e.data, e.sampleRate);
      };
    `);

    assert(actual === expected);
  });
  it("do nothing to declared identifiers", () => {
    var actual = compiler.compile(`
      var sampleRate = 0;

      function onmessage(parameters) {
        console.log(parameters);
      }
      console.log(parameters);
    `);
    var expected = format(`
      var sampleRate = 0;

      function onmessage(parameters) {
        console.log(parameters);
      }
      console.log(self.parameters);
    `);

    assert(actual === expected);
  });
});
