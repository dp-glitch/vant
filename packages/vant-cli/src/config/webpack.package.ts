import merge from 'webpack-merge';
import { baseConfig } from './webpack.base';
import { getVantConfig, getWebpackConfig } from '../common';
import { LIB_DIR, PACKAGE_ENTRY_FILE } from '../common/constant';

export function packageConfig(isMinify: boolean) {
  const { name } = getVantConfig();

  return merge(
    baseConfig as any,
    {
      mode: 'production',
      entry: {
        [name]: PACKAGE_ENTRY_FILE
      },
      stats: 'none',
      output: {
        path: LIB_DIR,
        library: name,
        libraryTarget: 'umd',
        filename: isMinify ? '[name].min.js' : '[name].js',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6522
        globalObject: "typeof self !== 'undefined' ? self : this"
      },
      externals: {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        }
      },
      performance: false,
      optimization: {
        minimize: isMinify
      }
    },
    getWebpackConfig()
  );
}