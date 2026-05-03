import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueLayouts from 'vite-plugin-vue-layouts'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        VueRouter({
            routesFolder: 'resources/ts/pages',
            dts: 'typed-router.d.ts',
        }),
        vue({
            template: {
                transformAssetUrls,
            },
        }),
        VueLayouts({
            layoutsDirs: 'resources/ts/layouts',
            defaultLayout: 'default',
        }),
        vuetify({
            autoImport: true,
        }),
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core'],
            dirs: ['resources/ts/@core/composable', 'resources/ts/composables'],
            dts: 'auto-imports.d.ts',
            vueTemplate: true,
        }),
        Components({
            dirs: [
                'resources/ts/components',
                'resources/ts/@core/components',
                'resources/ts/@layouts/components',
            ],
            dts: 'components.d.ts',
        }),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/ts/main.ts'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/ts', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./resources/ts/@layouts', import.meta.url)),
            '@images': fileURLToPath(new URL('./resources/images', import.meta.url)),
            '@styles': fileURLToPath(new URL('./resources/styles', import.meta.url)),
            '@core': fileURLToPath(new URL('./resources/ts/@core', import.meta.url)),
            '@db': fileURLToPath(new URL('./resources/ts/plugins/fake-api/handlers', import.meta.url)),
        },
    },
    server: {
        host: '127.0.0.1',
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
})
