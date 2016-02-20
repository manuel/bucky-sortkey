// This is a property-based test using https://github.com/jsverify/jsverify
// that checks that sort keys produce the same result as the specification in spec.js
// for randomly generated s-expressions (up to four levels of list nesting).

var toSortKey = require('../index.js').toSortKey
var spec = require("./spec.js")
var jsc = require("jsverify")

var list1 = jsc.oneof([jsc.asciistring, jsc.array(jsc.asciistring)])
var list2 = jsc.oneof([jsc.asciistring, jsc.array(list1)])
var list3 = jsc.oneof([jsc.asciistring, jsc.array(list2)])
var listN = jsc.oneof([jsc.asciistring, jsc.array(list3)])

jsc.check(jsc.forall(listN, listN, function (sexp1, sexp2) {
    return (spec.sexpCompare(sexp1, sexp2) === spec.sortKeyCompare(sexp1, sexp2))
        && (spec.sexpCompare(sexp2, sexp1) === spec.sortKeyCompare(sexp2, sexp1))
        && (spec.sexpCompare(sexp1, sexp1) === spec.sortKeyCompare(sexp1, sexp1))
        && (spec.sexpCompare(sexp2, sexp2) === spec.sortKeyCompare(sexp2, sexp2))
}), { tests: 50000 })
