var sortKey = require('./index.js').sortKey
var assert = require('assert')

function testFunctionWithSamples(fn) {
    fn(['!'], [','])
    fn('', 'abc')
    fn('a', 'abc')
    fn('ab', 'abc')
    fn('abc', 'def')
    fn('', [])
    fn('', ['abc'])
    fn('abc', ['abc'])
    fn([''], ['abc'])
    fn(['abc'], ['abc', 'def'])
    fn(['abc', 'abc'], ['abc', 'def'])
    fn(['abc', ''], ['abc', 'abc'])
    fn(['abc', 'a'], ['abc', 'abc'])
    fn(['abc', 'ab'], ['abc', 'abc'])
    fn(['abc', ''], ['abc', []])
    fn(['abc', ''], ['abc', [[]]])
    fn(['abc', ''], ['abc', ['abc']])
    fn(['abc', 'a'], ['abc', ['abc']])
    fn(['abc', 'ab'], ['abc', ['abc']])
    fn(['abc', 'abc'], ['abc', ['abc']])
    fn(['abc', 'abcdef'], ['abc', ['abc']])
    fn(['abc', 'abc'], ['abc', ['def']])
    fn(['abc', 'abcdef'], ['abc', ['def']])
    fn(['abc', ''], ['abc', ['abc'], ['abc']])
    fn(['abc', 'a'], ['abc', ['abc'], ['abc']])
    fn(['abc', 'ab'], ['abc', ['abc'], []])
    fn(['abc', 'ab'], ['abc', ['abc'], ['abc']])
    fn(['abc', []], ['abc', ['abc']])
    fn(['abc', ['a']], ['abc', ['abc']])
    fn(['abc', ['ab']], ['abc', ['abc']])
    fn(['abc', ['ab'], []], ['abc', ['abc']])
    fn(['abc', ['ab']], ['abc', ['abc'], []])
}

function stringOrArraySmaller(soa1, soa2) {
    return stringOrArrayCompare(soa1, soa2) < 0 
}

function stringOrArrayCompare(soa1, soa2) {
    if (Array.isArray(soa1)) {
        if (Array.isArray(soa2)) {
            return arrayCompare(soa1, soa2)
        } else if (typeof soa2 === 'string') {
            return 1;
        } else {
            throw "Must be string or array: " + soa2
        }
    } else if (typeof soa1 === 'string') {
        if (Array.isArray(soa2)) {
            return -1
        } else if (typeof soa2 === 'string') {
            return stringCompare(soa1, soa2)
        } else {
            throw "Must be string or array: " + soa2
        }
    } else {
        throw "Must be string or array: " + soa1;
    }
}

function arrayCompare(a1, a2) {
    var len = Math.min(a1.length, a2.length)
    for (var i = 0; i < len; i++) {
        var c = stringOrArrayCompare(a1[i], a2[i]);
        if (c !== 0) {
            return c;
        }
    }
    if (a1.length === a2.length) {
        return 0;
    } else {
        return a1.length - a2.length;
    }
}

function stringCompare(s1, s2) {
    if (s1 < s2) {
        return -1
    } else if (s1 > s2) {
        return 1
    } else {
        return 0
    }
}

testFunctionWithSamples(function(soa1, soa2) {
    assert(sortKey(soa1) < sortKey(soa2))
    assert(sortKey(soa2) > sortKey(soa1))
    assert(stringOrArraySmaller(soa1, soa2))
    assert(!stringOrArraySmaller(soa2, soa1))
})

var jsc = require("jsverify")
var array1 = jsc.array(jsc.asciistring)
var array2 = jsc.array(jsc.oneof([jsc.asciistring, array1]))
var array3 = jsc.array(jsc.oneof([jsc.asciistring, array1, array2]))
var array = jsc.array(jsc.oneof([jsc.asciistring, array1, array2, array3]))

jsc.check(jsc.forall(array, array, function (soa1, soa2) {
    return (sortKey(soa1) < sortKey(soa2)) === (stringOrArraySmaller(soa1, soa2))
}), { tests: 50000 })
