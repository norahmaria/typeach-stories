import type { ResolvedConfig } from 'vite';

import type { Config } from './Config.js';

export interface Context {
	config: Config;
	viteConfig: ResolvedConfig;
}
