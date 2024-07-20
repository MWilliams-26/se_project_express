module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recom"airbnb-base"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions:m {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};