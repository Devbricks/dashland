module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  parser: "babel-eslint",
  extends: ["airbnb-base"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "no-return-assign": ["error", "except-parens"],
    "object-curly-newline": ["error", {
      "ObjectExpression": {"consistent": true},
      "ObjectPattern": {"consistent": true}
    }],
  },
  plugins: ["import"]
};
