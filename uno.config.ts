import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';

// 先不使用 presetAttributify
export default defineConfig({
  exclude: ['node_modules', 'dist', '.git', 'public'],
  presets: [
    presetUno(),
  ],
  theme: {
    colors: {
      DarkBlue: '#1E3E8F',
    }
  }
})