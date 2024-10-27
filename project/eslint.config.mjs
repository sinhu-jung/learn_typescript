import tsESLint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default tsESLint.config(
  { ignores: ["dist", "node_modules"] },
  ...tsESLint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    rules: {
      semi: ["warn"],
      // indent: ["error", 2],
    },
  },
  eslintConfigPrettier
);
