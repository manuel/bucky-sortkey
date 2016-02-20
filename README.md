[![Build Status](https://travis-ci.org/manuel/bucky-sortkey.svg?branch=master)](https://travis-ci.org/manuel/bucky-sortkey)

This package lets you encode s-expressions like `["foo", ["bar",
["baz"], []]]` as special strings, called sort keys, that produce a
"natural" sort order when compared using ordinary strcmp()
lexicographic comparison.  This is useful for example for using
s-expressions as keys in a database system that only supports
lexicographic comparison.

An s-expression is either:

* A string of zero or more characters (not containing any NUL \0 characters)
* A list of zero or more s-expressions

Strings sort before lists, and shorter strings (lists) sort before
longer strings (lists) that have the shorter string (list) as prefix.

Here are some sample s-expressions and their sort keys (in increasing order):

````
expr: "foo"
sort: "foo\0

expr: ["foo","bar"]
sort: ["foo\0"bar\0\0

expr: ["foo",[],["bar"]]
sort: ["foo\0[\0["bar\0\0\0
````

## Format

A string is encoded as: `"` + string + `\0`

A list is encoded as: `[` + concatenated contents of list + `\0`

`"` (ASCII 34) sorts before `[` (ASCII 91), so strings automatically
come before lists.

## Code map

* [implementation](index.js)
* [specification](test/spec.js)
* [unit test](test/unit-test.js)
* [property test](test/property-test.js)
