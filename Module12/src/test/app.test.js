const expect = require("chai").expect;
// const helloFunc = require("../app").greet;
// const reduceFunc = require("../app").reduceFunc;
import { greet } from "../appForTest";
import { reduceFunc } from "../appForTest";

describe("return Hello", function() {
  it("hello", function() {
    const result = helloFunc();
    expect(result).to.be.a("string");
    expect(result).equal("hello");
  });
});

describe("reduce group", function() {
  it("empty arr", function() {
    const result = reduceFunc([]);
    expect(result).to.be.a("number");
    expect(result).equal(0);
  });
  it("positive numbers", function() {
    const result = reduceFunc([1, 2, 5]);
    expect(result).to.be.a("number");
    expect(result).equal(8);
  });
  it("negative numbers", function() {
    const result = reduceFunc([-1, -2, -5]);
    expect(result).to.be.a("number");
    expect(result).equal(-8);
  });
  it("not array", function() {
    const result = reduceFunc("test string");
    expect(result).to.be.a("boolean");
    expect(result).equal(false);
  });
  it("float numbers", function() {
    const result = reduceFunc([10.1, 20.2]);
    expect(result).to.be.a("number");
    expect(result).equal(30.3);
  });
});
