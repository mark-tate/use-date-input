import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";
import path from "path";

const pkgRootPath = process.cwd();
const pkg = require(path.join(pkgRootPath, "package.json"));

const config = {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: 'useDateInput',
      plugins: [
        terser()
      ],
      sourcemap: true
    },
    {
      file: "dist/index.js",
      format: "cjs",
      plugins: [
        visualizer({
          filename: "dist/stat-cjs.html",
          sourcemap: false
        })
      ],
      sourcemap: true
    },
    {
      file: "dist/index.min.js",
      format: "cjs",
      plugins: [
        terser(),
        visualizer({
          filename: "dist/stat-cjs-min.html",
          sourcemap: false
        })
      ],
      sourcemap: true
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      plugins: [
        visualizer({
          filename: "dist/stat-esm.html",
          sourcemap: false
        })
      ],
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "**/node_modules/**",
      babelHelpers: "runtime"
    }),
    commonjs(),
    filesize(),
    visualizer(),
    terser()
  ],
  external: [
    /@babel\/runtime/,
    "dayjs/plugin/weekday",
    "dayjs/plugin/advancedFormat",
    "dayjs/plugin/customParseFormat",
    "dayjs/plugin/isBetween",
    "dayjs/plugin/isSameOrAfter",
    "dayjs/plugin/isSameOrBefore",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
};

export default config;
