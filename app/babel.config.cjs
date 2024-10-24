const config = require("./tsconfig.app.json");

const alias = Object.entries(config["compilerOptions"]["paths"]).reduce(
  (acc, [key, value]) => {
    acc[key.replace("/*", "")] = value[0]
      .replace("/*", "")
      .replace("./", "./src/");
    return acc;
  },
  {},
);

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { esmodules: true } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias,
      },
    ],
  ],
};
