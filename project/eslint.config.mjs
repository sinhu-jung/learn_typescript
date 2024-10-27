import tsESLint from "typescript-eslint";
import eslint from "@eslint/js";
import globals from "globals";
import Prettier from "eslint-plugin-prettier";

export default tsESLint.config(
  { ignores: ["dist", "node_modules"] },
  eslint.configs.recommended,
  ...tsESLint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: {
      "eslint-plugin-prettier": Prettier,
    },
    rules: {
      semi: ["warn"],
      indent: ["error", 2],
    },
  }
);
