const { NODE_ENV } = process.env;

const inProduction = NODE_ENV === "production";
const inDevelopment = NODE_ENV === "development";

const environmentConfig = {
  test: {
    compact: false,
    presets: [
      [
        "@babel/preset-env",
        {
          modules: "cjs",
          debug: false
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: true
        }
      ],
      ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
      "@babel/plugin-proposal-class-properties"
]
  },
  production: {
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: true
        }
      ],
      ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
      "@babel/plugin-proposal-class-properties",
      "babel-plugin-styled-components"
    ]
  },
  development: {
    compact: false,
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: true
        }
      ],
      ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
      "@babel/plugin-proposal-class-properties",
      "babel-plugin-styled-components"
    ]
  }
};

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  return environmentConfig[process.env.NODE_ENV || "development"];
};
