import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'path';
import pkg from './package.json';

const name = pkg.name
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default defineConfig({
  clearScreen: false,
  plugins: [svelte()],
  build: {
    rollupOptions: {
      external: [
        "firebase",
        "@firebase",
        /firebase.*/,
        /@firebase.*/
      ]
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name,
    },
  },
});