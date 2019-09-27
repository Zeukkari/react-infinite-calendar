import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';
import graph from 'rollup-plugin-graph';
import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'Example',
      exports: 'named',
      sourcemap: true,
      globals: {
        react: 'React',
        "prop-types": 'PropTypes'
      },
    }
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
  ],

  plugins: [
    postcss({ modules: true, extract: false, plugins: [autoprefixer] }),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve(),
    commonjs(),
    filesize(),
    graph({prune: true})
  ],
};

export default config;
