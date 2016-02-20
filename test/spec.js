var toSortKey = require('../index.js').toSortKey

// Comparing sort keys with strcmp() must produce the same result as this function

function sexpCompare(sexp1, sexp2) {
    if (Array.isArray(sexp1)) {
        if (Array.isArray(sexp2)) {
            return arrayCompare(sexp1, sexp2)
        } else if (typeof sexp2 === 'string') {
            return 1 // sort arrays after strings
        } else {
            throw "Must be string or array: " + sexp2
        }
    } else if (typeof sexp1 === 'string') {
        if (Array.isArray(sexp2)) {
            return -1 // sort strings before arrays
        } else if (typeof sexp2 === 'string') {
            return stringCompare(sexp1, sexp2)
        } else {
            throw "Must be string or array: " + sexp2
        }
    } else {
        throw "Must be string or array: " + sexp1;
    }
}

function arrayCompare(a1, a2) {
    var len = Math.min(a1.length, a2.length)
    for (var i = 0; i < len; i++) {
        var c = sexpCompare(a1[i], a2[i]);
        if (c !== 0) {
            return c;
        }
    }
    if (a1.length === a2.length) {
        return 0;
    } else {
        return Math.sign(a1.length - a2.length);
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

function sortKeyCompare(sexp1, sexp2) {
    return stringCompare(toSortKey(sexp1), toSortKey(sexp2))
}

module.exports.sexpCompare = sexpCompare
module.exports.sortKeyCompare = sortKeyCompare
