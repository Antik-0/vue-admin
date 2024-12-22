export default {
  js2svg: {
    pretty: false,
  },
  multipass: true,
  plugins: [
    // set of built-in plugins enabled by default
    'preset-default',

    'prefixIds',
    'removeScriptElement',
    'removeRasterImages',
    'convertStyleToAttrs',
    'cleanupListOfValues',
  ],
}
