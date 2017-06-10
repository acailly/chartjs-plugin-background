import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

// rollup.config.js
export default {
  entry: 'src/chartjs-plugin-background.js',
  plugins: [
    babel(babelrc()),
  ],
  format: 'umd',
  moduleName: 'chartjs-plugin-background',
  dest: 'index.js',
  external: [ 'chart.js' ]
};
