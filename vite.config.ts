import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite' // 自動導入 hook
import Components from 'unplugin-vue-components/vite' // 自動引入 components
import Unocss from 'unocss/vite'

import { createRequire } from 'node:module'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
const require = createRequire(import.meta.url)
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('====================模式與環境====================')
  console.log('command', command)
  console.log('mode', mode)
  return {
    base: '/',
    plugins: [
      vue(),
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: false
        },
        dts: './auto-imports.d.ts'
      }),
      Components({
        dts: './components.d.ts'
      }),
      Unocss()
    ],
    server: {
      host: '0.0.0.0',
      port: 1804
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
