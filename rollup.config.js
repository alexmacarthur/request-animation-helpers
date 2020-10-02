const pkg = require("./package.json");
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

const OUTPUT_DATA = [
  {
    file: pkg.main,
    format: "umd",
  },
  {
    file: pkg.module,
    format: "es",
  },
];

export default OUTPUT_DATA.map(({ file, format }) => {
  const plugins = [];

  if (isProduction) {
    plugins.push(terser());
  }

  return {
    input: "./src/request-animation-helpers.js",
    output: {
      file,
      format,
      name: "RAHelpers",
    },
    plugins,
  };
});
