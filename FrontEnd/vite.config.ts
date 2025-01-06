import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    // server: {
    //     https: {
    //         key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //         cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
    //     },
    // },
    plugins: [
        react(),
        // visualizer({ filename: './dist/report.html', open: true, brotliSize: true }),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: null,

            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon-180x180.png'], // 필수 자산 파일
            manifest: {
                name: '환자 ERAS',
                short_name: 'ERAS',
                description: '환자 ERAS 관리 시스템',
                display: 'standalone',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable', // 마스크 가능 아이콘
                    },
                    {
                        src: '/maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable', // 마스크 아이콘
                    },
                    {
                        src: '/apple-touch-icon-180x180.png',
                        sizes: '180x180',
                        type: 'image/png',
                        purpose: 'any', // 필요에 따라 다른 용도로도 사용할 수 있음
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/stmary.site\.com\//, // 특정 도메인에 대해서만
                        handler: 'NetworkOnly', // 네트워크에서만 요청 처리
                    },
                ],
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id: string) => {
                    if (id.includes('react-datepicker')) {
                        return '@vendor-react-datepicker';
                    }
                    if (id.includes('lodash')) {
                        return '@vendor-lodash';
                    }

                    if (id.includes('axios')) {
                        return '@vendor-axios';
                    }
                    if (id.includes('react-select')) {
                        return '@vendor-react-select';
                    }
                    if (id.includes('framer-motion')) {
                        return '@vendor-framer-motion-';
                    }
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                        return '@vendor-react';
                    }
                },
            },
        },
    },
});
