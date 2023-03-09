import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

export interface AppPaths {
	js: string;
	html: string;
	dist: string;
}

export const getAppPaths = (): AppPaths => {
	const path = require.resolve('@peachy-stories/app/package.json');

	const dist = join(dirname(path), 'dist');

	return {
		js: join(dist, 'index.js'),
		html: join(dist, 'index.html'),
		dist,
	};
};
