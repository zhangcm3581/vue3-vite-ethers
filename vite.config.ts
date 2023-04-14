import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport, { VantResolve } from "vite-plugin-style-import";
// @ts-ignore
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/

/**
 * 根据环境变量设置输出目录
 * @param mode 环境变量
 * @returns
 */
function handleOutDirByMode(mode) {
  // console.log('环境', mode)
  // `${mode}-dist`
  return 'dist'
}

interface PreRenderedAsset {
  [key: string]: any
}

export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  return defineConfig({
    base: './', //打包路径
    define: {
      'process.env': process.env
    },
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => {
              return `../es/${name}/style/index`;
            },
          },
        ],
      }),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),

    ],
    optimizeDeps: {

    },
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // 解决You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
          additionalData: `
						@import "@/assets/styles/index.scss";
					`
        },
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    },
    //启动服务配置
    server: {
      host: '0.0.0.0',
      port: 8000,
      open: true,
      https: false,
      proxy: {}
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      outDir: handleOutDirByMode(mode),
      cssCodeSplit: false, // 禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      minify: 'esbuild', // 混淆器，terser构建后文件体积更小 ,esbuild  默认
      // 虽然 Terser 相对较慢，但大多数情况下构建后的文件体积更小。
      // ESbuild 最小化混淆更快, 但构建后的文件相对更大
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      assetsDir: 'static/images', // 静态资源目录
      // rollup 打包配置
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: PreRenderedAsset) => {
            var info = assetInfo.name.split('.')
            var extType = info[info.length - 1]
            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              extType = 'media'
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'images'
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts'
            }
            return `static/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js'
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true, // 生产环境移除debugger
        },
      }
    },
  })
}