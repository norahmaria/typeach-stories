#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { readFileSync } from 'node:fs';

import sade from 'sade';

import { dev } from './commands/dev.js';

const cli = (program: sade.Sade) => {
	const $dirname = dirname(fileURLToPath(import.meta.url));

	const packageInfo = readFileSync(join($dirname, '../package.json'), 'utf8');

	const { version } = JSON.parse(packageInfo) as {
		version: string;
	};

	program.version(version);

	program
		.command('dev')
		.describe('HMR viewing of stories')
		.option('-p, --port <port>', 'Port of the live client')
		.action(async (options: { port?: string }) => {
			await dev({
				port: parseInt(options.port ?? '6006', 10),
			});
		});

	program.parse(process.argv);
};

cli(sade('peachy-stories'));
