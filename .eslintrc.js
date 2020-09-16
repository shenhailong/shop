/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-24 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-16 13:10:21
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "quotes": [2, "single"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "space-infix-ops": ["error", {"int32Hint": false}],
    "indent": ["error", 2],
    "key-spacing": ["error", { "beforeColon": false }],
    "lines-between-class-members": ["error", "always"],
    "no-redeclare": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "no-unneeded-ternary": "error",
    "no-useless-escape": "off"
  }
};
