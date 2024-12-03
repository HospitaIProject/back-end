import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {VitePWA} from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    // server: {
    //     https: {
    //         key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //         cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
    //     },
    // },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
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

                        urlPattern: /.*/, // 모든 요청에 대해 적용

                        handler: 'NetworkFirst', // 네트워크 우선 전략
                        options: {
                            cacheName: 'dynamic-cache',
                            expiration: {
                                maxEntries: 50, // 최대 캐시 항목 수

                                maxAgeSeconds: 24 * 60 * 60, // 캐시 유지 시간 (1일)

                            },
                        },
                    },
                ],
            },
        }),
    ],
});
