import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 命名規則: camelCase, PascalCase, UPPER_CASE
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        { selector: "typeLike", format: ["PascalCase"] },
      ],
      // インラインスタイル制限
      "react/jsx-no-inline-styles": [
        "warn",
        {
          allow: [
            "animation",
            "background",
            "backgroundImage",
            "backgroundClip",
            "WebkitBackgroundClip",
            "WebkitTextFillColor",
            "backgroundPosition",
            "backgroundSize",
          ],
        },
      ],
      // Tailwindクラス順序（prettier-plugin-tailwindcssで自動整形推奨）
      // ここでは警告のみ
      "tailwindcss/classnames-order": "warn",
    },
    plugins: ["@typescript-eslint", "tailwindcss", "react"],
  },
];

export default eslintConfig;
