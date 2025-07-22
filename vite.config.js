import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dsv from '@rollup/plugin-dsv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), dsv()],
  base: '/the-numbers-behind-the-fight.github.io'
})
