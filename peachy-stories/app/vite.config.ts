import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import macros from 'unplugin-vue-macros/vite';
import svg from 'vite-svg-loader';

export default defineConfig({
	plugins: [
		svg(),
		macros({
			plugins: {
				vue: vue(),
			},
		}),
	],

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},

	build: {
		rollupOptions: {
			external: [/\$peachy/, 'vue'],

			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name][extname]',
			},
		},

		cssCodeSplit: false,
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @import "./src/sass/_variables.scss";
          @import "./src/sass/_colors.scss";
        `,
			},
		},
	},
});
