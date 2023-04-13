import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import type { AppPaths } from '../../utils/getAppPaths.js';

const transformIndexHtml = (html: string, appPaths: AppPaths) => {
	const toAbsolutePath = (path: string) => `/@fs${join(appPaths.dist, path)}`;

	return html.replaceAll(/(src|href)="([^"]*)"/gm, (match, _, url: string) =>
		match.replace(url, toAbsolutePath(url))
	);
};

export const getEntryHtml = async (appPaths: AppPaths) => {
	const require = createRequire(import.meta.url);

	const html = existsSync(appPaths.html)
		? await readFile(appPaths.html, 'utf-8')
		: await readFile(require.resolve('../fallback.html'), 'utf-8');

	return transformIndexHtml(html, appPaths);
};
