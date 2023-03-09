import { join } from 'node:path';

import type { AppPaths } from './getAppPaths.js';

export const transformIndexHtml = (html: string, appPaths: AppPaths) => {
	const toAbsolutePath = (path: string) => `/@fs${join(appPaths.dist, path)}`;

	return html.replaceAll(/(src|href)="([^"]*)"/gm, (match, _: string, url: string) =>
		match.replace(url, toAbsolutePath(url))
	);
};
