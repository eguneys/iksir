import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';

export default {
  input: ['src/main.ts'],
  output: {
    dir: 'dist',
    entryFileNames: '[name].js',
  },
  plugins: [
    string({
      include: "**/*.(frag|vert)",
    }),
    typescript()
  ],
  watch: {
    clearScreen: false
  }

}

