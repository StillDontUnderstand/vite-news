import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 字符串简写写法
      '/api': {
        target: 'http://192.168.142.152:8000', // 拦截到'api/wristband'的，将axios中baseURL替换成target
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,                  // proxy websockets
        changeOrigin: true,        // 是否跨域
      },
      '/apache': {
        target: "https://cdn.jsdelivr.net",
        rewrite: (path) => path.replace(/^\/apache/, ''),
        ws: true,                  // proxy websockets
        changeOrigin: true,        // 是否跨域
      },
    }
  }
})