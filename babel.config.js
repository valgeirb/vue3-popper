const devPresets = ["@vue/babel-preset-app"];
const buildPresets = [
  [
    "@babel/preset-env",
    // Config for @babel/preset-env
    {
      include: [/(optional-chaining|nullish-coalescing)/],
    },
  ],
];
module.exports = {
  presets: process.env.NODE_ENV === "development" ? devPresets : buildPresets,
};
