import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';
import sass from 'rollup-plugin-sass';
import scss from 'rollup-plugin-scss'

import pkg from './package.json';

const dependencies = Object.keys(require('./package.json').dependencies)

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'react-infinite-calendar',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
        classnames: 'classNames',
        recompose: 'recompose',
        'react-tiny-virtual-list': 'VirtualList',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'react-infinite-calendar',
    },
  ],
  external: dependencies,
  plugins: [
    scss(),
    peerDepsExternal(),
    postcss({ extract: true, plugins: [autoprefixer, sass] }),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve(),
    commonjs(),
    filesize(),
  ],
};

export default config;