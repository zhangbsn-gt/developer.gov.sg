module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:vue/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-undef": ["off"],
    "no-unused-vars": ["warn"],
    "vue/attributes-order": ["off"],
    "vue/multi-word-component-names": ["off"],
    "vue/order-in-components": ["off"],
  },
};
