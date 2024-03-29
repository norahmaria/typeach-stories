import { relative } from 'node:path';

import { type Plugin } from 'vite';

import type { Stories } from '../stories.js';
import type { Story } from '../types/index.js';

import { type AppPaths } from '../utils/index.js';
import { getEntryHtml } from './lib/index.js';

export const createVitePlugin = (stories: Stories, appPaths: AppPaths): Plugin => ({
	name: 'peachy-stories',

	config() {
		return {
			optimizeDeps: {
				include: ['vue'],
			},

			build: {
				minify: 'terser',
			},

			server: {
				fs: {
					allow: [process.cwd(), appPaths.dist],
				},
			},
		};
	},

	resolveId(id) {
		if (id.startsWith('$peachy-stories')) {
			return '$peachy-stories/resolved';
		}
	},

	load(id) {
		if (id === '$peachy-stories/resolved') {
			const imports = stories.stories
				.map((story, index) => `import Comp${index} from '/${story.file}';`)
				.join('\n');

			const space = (count = 1) => ' '.repeat(count);

			const stringifyStory = (story: Story, index: number) => {
				const properties = [
					`id: '${story.id}'`,
					`file: '/${story.file}'`,
					`component: Comp${index}`,
					`pendingUpdates: ${story.pendingUpdates}`,
				];

				const formattedProperties = properties
					.map(property => `${space(4)}${property}`)
					.join(',\n');

				return `${space(2)}{\n${formattedProperties}\n${space(2)}}`;
			};

			const files = stories.stories.map(stringifyStory).join(',\n');

			const filesVariable = `export let rawFiles = [\n${files}\n];`;

			const updateHandlers = `
        const handlers = [];

        export const onUpdate = (callback) => {
          handlers.push(callback);
        }
      `;

			const hmr = `
        if (import.meta.hot) {
          import.meta.hot.accept(update => {
            rawFiles = update.rawFiles;

            handlers.forEach(handler => {
              handler(update.rawFiles.filter(file => file.pendingUpdates));
              update.onUpdate(handler);
            })
          });
        }
      `;

			const listeners = `${updateHandlers}\n\n${hmr}`;

			return `${imports}\n\n${filesVariable}\n\n${listeners}`;
		}
	},

	/* eslint-disable */
	async transform(code, id) {
		if (id.includes('?vue&type=component-file')) {
			/** @TODO Add types documentation */
			return 'export default Comp => {}';
		}

		if (id.includes('?vue&type=docs')) {
			return `export default Comp => { Comp.__docs = ${JSON.stringify(code)}; }`;
		}
	},

	async handleHotUpdate({ file, server }) {
		const relativeFilePath = relative(`${process.cwd()}/src`, file);

		stories.update(relativeFilePath);

		const mod = server.moduleGraph.getModuleById('$peachy-stories/resolved');

		if (mod) {
			await server.reloadModule(mod);
		}
	},

	configureServer(server) {
		server.ws.on('$peachy-stories/updates-resolved', (updatedStories: Story[]) => {
			updatedStories.forEach(story => stories.completeUpdate(story.file));
		});

		return () => {
			/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
			server.middlewares.use(async (req, res, next) => {
				if (req.url?.endsWith('.html')) {
					const html = await getEntryHtml(appPaths);

					res.setHeader('content-type', 'text/html; charset=UTF-8');
					res.end(await server.transformIndexHtml(req.url, html));

					return;
				}

				next();
			});
		};
	},
});
