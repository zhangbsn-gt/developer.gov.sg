module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double", {
                allowTemplateLiterals: true
            }
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};