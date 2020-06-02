var sanitizeHtml = require('sanitize-html');

function cleanHtml(dirtyCode) {
    let clean = sanitizeHtml(dirtyCode)
    return clean
}

module.exports = cleanHtml;