var STR_START = '"'
var ARR_START = '('
var STR_END   = '\u0000'
var ARR_END   = '\u0000'

function sortKey (stringOrArray) {
    if (Array.isArray(stringOrArray)) {
        return ARR_START + stringOrArray.map(sortKey).join('') + ARR_END
    } else if (typeof stringOrArray === 'string') {
        if (stringOrArray.indexOf("\u0000") !== -1) {
            throw "Must not contain NUL byte: " + stringOrArray;
        }
        return STR_START + stringOrArray + STR_END
    } else {
        throw "Must be string or array: " + stringOrArray
    }
}

module.exports.sortKey = sortKey
