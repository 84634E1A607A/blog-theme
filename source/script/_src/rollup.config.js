const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')

module.exports = ['banderole'].map(name => ({
  input: `src/${name}.js`,
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs(),
    terser({
      compress: {
        pure_getters: true
      },
      output: {
        comments: false
      }
    })
  ],
  output: [
    {
      file: `../scheme/${name}.js`,
      name: 'Nlvi',
      format: 'umd'
    }
  ]
}))
