const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('./metroTransformer.js'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg' && ext !== 'scss'),
      sourceExts: [...sourceExts, 'svg', 'scss', 'sass'],
    },
  };
})();
