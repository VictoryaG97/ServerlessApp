function validateLength(text, minLength, maxLength = null) {
    if (!text || typeof text !== 'string') {
        return false;
    }
    if (text.length >= minLength && (maxLength === null || text.length <= maxLength)) {
        return true;
    }
    return false;
}

function validateIsNumber(text) {
    return testRegex(text, /^\d+$/);
}

function validateIsWord(text) {
    return testRegex(text, /^[a-zA-Z\u0410-\u044F]+$/);
}

function validateSymbolsForUsername(text) {
    return testRegex(text, /^[\w\.]+$/);
}

function testRegex(text, regex) {
    if (!text || typeof text !== 'string') {
        return false;
    }
    return regex.test(text);
}