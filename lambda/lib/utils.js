const crypto = require("crypto");
const slugify = require("slugify");
module.exports = {
    generateId,
    getMissingParams,
    sortTerms,
    firstArrayContainsSecondArray,
    toLowerCaseSlug,
    emailRegex:
        process.env.NODE_ENV === "production"
            ? /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[\w\.]*gov\.sg$/
            : /.*/
};

async function generateId(bytes = 4, encoding = "hex") {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(bytes, function(err, buffer) {
            if (err) {
                reject(err);
            }
            resolve(buffer.toString(encoding));
        });
    });
}

function getMissingParams(paramList, requestBody) {
    return paramList.filter(param => {
        return Object.keys(requestBody).indexOf(param) === -1;
    });
}

function sortTerms(terms) {
    terms.sort((a, b) => {
        var nameA = a.term.toUpperCase();
        var nameB = b.term.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function firstArrayContainsSecondArray(first, second) {
    return second.reduce((previous, current) => {
        return previous && first.indexOf(current) !== -1;
    }, true);
}

function toLowerCaseSlug(thing) {
    return slugify(thing, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });
}
