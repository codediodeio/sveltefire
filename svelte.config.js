const autoPreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: autoPreprocess({
    postcss: true,
  }),
};