var maxTextLength = (string, maxNum) => {
    var length = string.length
    if (length > maxNum) {
        var newString = string.slice(0, maxNum) + "..."
        return newString
    }
    return string
}

var stringUtil = {
    maxTextLength,
}


module.exports = stringUtil
