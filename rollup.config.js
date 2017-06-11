import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import uglify from 'rollup-plugin-uglify'

// rollup.config.js
export default {
  entry: 'src/chartjs-plugin-background.js',
  plugins: [
    babel(babelrc()),
    uglify()
  ],
  format: 'umd',
  moduleName: 'chartjs-plugin-background',
  dest: 'index.js',
  external: [ 'chart.js' ]
}
