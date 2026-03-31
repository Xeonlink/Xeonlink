  /**
 * @type {import('prettier').Config}
 */
const config = {
  trailingComma: "all",
  plugins: [
    "prettier-plugin-curly",
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-organize-imports",
    "prettier-plugin-package",
    await import("./src/index.ts").then(
      (module) => module.default,
    ),
  ],
};

export default config;
