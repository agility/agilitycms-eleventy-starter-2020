const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === "development";

const plugins = [
  tailwindcss('tailwind.config.js'),
  autoprefixer,
];

if (!isDev) {
  const purgecss = require('@fullhuman/postcss-purgecss');
  const cssnano = require('cssnano');

  [].push.apply(plugins, [
    purgecss({
      content: ['src/**/*.njk', 'src/**/*.md', 'src/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
    cssnano({
      preset: 'default',
    }),
  ]);
}

module.exports = { plugins };