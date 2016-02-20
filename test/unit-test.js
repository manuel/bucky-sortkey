var toSortKey = require('../index.js').toSortKey
var spec = require("./spec.js")
var assert = require('assert')

function testFn(sexp1, sexp2) {
    assert(spec.sexpCompare(sexp1, sexp2) < 0)
    assert(spec.sexpCompare(sexp2, sexp1) > 0)
    assert(spec.sortKeyCompare(sexp1, sexp2) < 0)
    assert(spec.sortKeyCompare(sexp2, sexp1) > 0)

    assert(spec.sortKeyCompare(sexp1, sexp1) === 0)
    assert(spec.sortKeyCompare(sexp2, sexp2) === 0)
    assert(spec.sexpCompare(sexp1, sexp1) === 0)
    assert(spec.sexpCompare(sexp2, sexp2) === 0)
}

testFn('', 'abc')
testFn('a', 'abc')
testFn('ab', 'abc')
testFn('abc', 'def')
testFn(['!'], [','])
testFn('', [])
testFn('', ['abc'])
testFn('abc', ['abc'])
testFn([''], ['abc'])
testFn(['abc'], ['abc', 'def'])
testFn(['abc', 'abc'], ['abc', 'def'])
testFn(['abc', ''], ['abc', 'abc'])
testFn(['abc', 'a'], ['abc', 'abc'])
testFn(['abc', 'ab'], ['abc', 'abc'])
testFn(['abc', ''], ['abc', []])
testFn(['abc', ''], ['abc', [[]]])
testFn(['abc', ''], ['abc', ['abc']])
testFn(['abc', 'a'], ['abc', ['abc']])
testFn(['abc', 'ab'], ['abc', ['abc']])
testFn(['abc', 'abc'], ['abc', ['abc']])
testFn(['abc', 'abcdef'], ['abc', ['abc']])
testFn(['abc', 'abc'], ['abc', ['def']])
testFn(['abc', 'abcdef'], ['abc', ['def']])
testFn(['abc', ''], ['abc', ['abc'], ['abc']])
testFn(['abc', 'a'], ['abc', ['abc'], ['abc']])
testFn(['abc', 'ab'], ['abc', ['abc'], []])
testFn(['abc', 'ab'], ['abc', ['abc'], ['abc']])
testFn(['abc', []], ['abc', ['abc']])
testFn(['abc', ['a']], ['abc', ['abc']])
testFn(['abc', ['ab']], ['abc', ['abc']])
testFn(['abc', ['ab'], []], ['abc', ['abc']])
testFn(['abc', ['ab']], ['abc', ['abc'], []])