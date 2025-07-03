module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "max-len": ["error", { code: 100 }],
  },
  ignorePatterns: [
    "node_modules/",
    "android/",
    "ios/",
    "vendor/",
    "build/",
    "dist/",
  ],
};
