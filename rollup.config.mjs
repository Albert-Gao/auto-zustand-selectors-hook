import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };
import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions} */
const option = {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    external(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      exclude: ['**/__tests__/**', '*.spec.*', '*.test.*'],
      clean: true,
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps(),
    terser(),
  ],
};

export default option;
