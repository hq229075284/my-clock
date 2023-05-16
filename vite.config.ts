import { defineConfig } from 'vite'
// vite-plugin-imp
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const USE_FOR_BUILD_NPM_PKG = {
  lib: {
    // Could also be a dictionary or array of multiple entry points
    entry: './src/main.ts',
    name: 'MyLib',
    // formats: ['es'],
    // the proper extensions will be added
    fileName: 'my-lib',
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: 'Vue',
      },
      // entryFileNames: '[name].[hash:6].[format].js',
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    target: 'chrome51', // 目标版本兼容
    minify: false, // 不压缩
    // 此配置仅在npm包构建时使用。在完整项目中【不需要】此配置
    ...USE_FOR_BUILD_NPM_PKG,
  },
})
