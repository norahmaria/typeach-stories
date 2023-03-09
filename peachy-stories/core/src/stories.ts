import chokidar from 'chokidar';

import type { Context, Story } from './types/index.js';
import { kebabCase } from './utils/index.js';

export class Stories {
	watcher: chokidar.FSWatcher;

	events: ((story: Story) => void)[] = [];

	stories: Story[] = [];

	constructor(readonly context: Context) {
		this.watcher = chokidar.watch(context.config.storyMatch, {
			cwd: this.context.config.sourceDir,
		});

		this.watcher.on('add', file => {
			this.add(file);
		});

		this.watcher.on('unlink', file => {
			this.remove(file);
		});
	}

	async addAll() {
		(await this.getStoryFiles()).forEach(file => this.add(file));
	}

	async getStoryFiles() {
		const globby = await import('globby');

		return globby.globby(this.context.config.storyMatch, {
			cwd: this.context.config.sourceDir,
		});
	}

	reset() {
		this.stories = [];
	}

	add(file: string): Story {
		const existing = this.find(file);

		if (existing) {
			return existing;
		}

		this.stories.push({
			id: kebabCase(file.replace('.story.vue', '').replace('/', '--')),
			pendingUpdates: false,
			file,
		});

		return this.find(file);
	}

	completeUpdate(file: string) {
		const existing = this.stories.findIndex(story => story.file === file);

		if (existing === -1) {
			return console.error('No story for:', file);
		}

		this.stories[existing] = {
			...this.stories[existing],
			pendingUpdates: false,
		};
	}

	update(file: string): Story {
		const existing = this.stories.findIndex(story => story.file === file);

		if (existing === -1) {
			return this.add(file);
		}

		this.stories[existing] = {
			id: kebabCase(file.replace('.story.vue', '').replace('/', '--')),
			pendingUpdates: true,
			file,
		};

		return this.find(file);
	}

	find(file: string) {
		return this.stories.find(story => story.file === file);
	}

	remove(file: string) {
		const storyIndex = this.stories.findIndex(story => story.file === file);

		if (storyIndex !== -1) {
			this.stories.splice(storyIndex, 1);
		}
	}
}
