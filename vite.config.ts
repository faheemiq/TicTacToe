import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    solid(),
    devtools({
      autoname: true,
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    eslint({
      failOnError: false,
    }),
  ],
  base: './',
});
