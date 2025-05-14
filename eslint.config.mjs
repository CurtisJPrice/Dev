// eslint.config.mjs
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        console: "readable",
        exports: "writable",
        module: "readable",
        require: "readable",
        process: "readable"
      }
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"]
    }
  }
];
