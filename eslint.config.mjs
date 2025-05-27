// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This is your primary configuration object
  {
    // Place this 'ignores' array within a config object that applies broadly
    // It will prevent ESLint from processing files matching these patterns
    ignores: [
      "src/generated/prisma/**", // Ignore everything inside the prisma generated directory
      // Add other generated/build directories here if needed, e.g.:
      // "dist/**",
      // "build/**",
      // ".next/**", // Next.js build output
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // You would remove the previous specific 'files' override if you use 'ignores'
  // because 'ignores' prevents the file from being processed at all.
  // The following block should be removed if you use the 'ignores' strategy:
  /*
  {
    files: ["./src/generated/prisma/index.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  */
];

export default eslintConfig;