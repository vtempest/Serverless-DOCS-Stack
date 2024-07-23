/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"]
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      },
      rules: {
        // TODO delete this line when the following PR will be merged
        // https://github.com/sveltejs/eslint-plugin-svelte/issues/348
        "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^\\$\\$(Props|Events|Slots)$" }],
        // TODO this should be deleted, it's a known bug
        // https://github.com/sveltejs/eslint-plugin-svelte/issues/652
        "svelte/valid-compile": "off"
      }
    }
  ]
};
