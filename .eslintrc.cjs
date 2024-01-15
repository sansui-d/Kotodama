require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "no-undef": 0,
    "max-len": ["error", {"code": 120}],
    "vue/singleline-html-element-content-newline": 0,
    "vue/new-line-between-multi-line-property": 0
  },
};
