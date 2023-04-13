import { join } from 'node:path';
import { resolveConfig, createServer, type Plugin } from 'vite';

import type { Context, Options } from '../types/index.js';

import { Stories } from '../stories.js';
import { getAppPaths } from '../utils/getAppPaths.js';
import { createVitePlugin } from '../plugin/index.js';

export const dev = async (options: Options) => {
	const vue = (await import('@vitejs/plugin-vue')).default as unknown as () => Plugin;

	const context: Context = {
		viteConfig: await resolveConfig({}, 'serve'),

		config: {
			sourceDir: join(process.cwd(), 'src'),
			storyMatch: ['**/*.story.vue'],
		},
	};

	const stories = new Stories(context);

	await stories.addAll();

	const server = await createServer({
		root: context.config.sourceDir,

		plugins: [createVitePlugin(stories, getAppPaths()), vue()],

		server: {
			watch: {
				usePolling: true,
			},
		},
	});

	await server.pluginContainer.buildStart({});

	await server.listen(options.port);

	server.printUrls();
};
