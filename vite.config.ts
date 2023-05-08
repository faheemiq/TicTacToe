import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import devtools from 'solid-devtools/vite';
import { undestructurePlugin } from 'babel-plugin-solid-undestructure';

export default defineConfig({
  plugins: [
    ...undestructurePlugin('ts'),
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
