import { join } from 'node:path';

import { resolveConfig, createServer, type Plugin } from 'vite';
import type { Context, Options } from '../types/index.js';

import { getAppPaths } from '../utils/getAppPaths.js';
import { createVitePlugin } from '../plugin.js';
import { Stories } from '../stories.js';

export const dev = async (options: Options) => {
	const vue = (await import('@vitejs/plugin-vue')).default as unknown as () => Plugin;

	const context: Context = {
		viteConfig: await resolveConfig({}, 'serve'),

		config: {
			sourceDir: join(process.cwd(), 'src'),
			storyMatch: ['**/*.story.vue'],
		},
	};

	const appPaths = getAppPaths();

	const stories = new Stories(context);

	await stories.addAll();

	const server = await createServer({
		root: context.config.sourceDir,

		server: {
			watch: {
				usePolling: true,
			},
		},

		plugins: [createVitePlugin(stories, appPaths), vue()],
	});

	await server.pluginContainer.buildStart({});

	await server.listen(options.port);

	server.printUrls();
};
