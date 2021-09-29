import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/main.ts'],
  output: {
    dir: 'dist',
    entryFileNames: '[name].js',
  },
  plugins: [
    typescript()
  ],
  watch: {
    clearScreen: false
  }

}

