const crypto = require("crypto");
const slugify = require("slugify");
const _ = require('lodash');
module.exports = {
    generateId,
    getMissingParams,
    sortTerms,
    firstArrayContainsSecondArray,
    toLowerCaseSlug,
    getUsersPullRequests,
    emailRegex:
        process.env.NODE_ENV === "production"
            ? /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[\w\.]*gov\.sg$/
            : /.*/
};

async function generateId(bytes = 4, encoding = "hex") {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(bytes, function (err, buffer) {
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

function getUsersPullRequests(username, pullRequests) {
    let userPullRequests = [];
    _.forEach(pullRequests, (pullRequest) => {
        let assignees = pullRequest.assignees;
        _.forEach(assignees, (value) => {
            if (value.login === username) {
                // Set product name and person who submitted the PR
                let title = pullRequest.title;
                let titleComponents = title.split(" ");
                let indexOfProduct = titleComponents.indexOf("page");
                const submitee = titleComponents[titleComponents.length - 1];
                const product = titleComponents[indexOfProduct - 1];
                pullRequest['submitee'] = submitee;
                pullRequest['product'] = product;
                userPullRequests.push(pullRequest);
            }
        });
    });
    return userPullRequests;
}