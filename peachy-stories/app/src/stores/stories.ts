import { ref } from 'vue';
import { defineStore } from 'pinia';

import MarkdownIt from 'markdown-it';

import type { Story, StoryFile } from '../types';
import { run } from '../run';

export const useStories = defineStore('stories', () => {
	const files = ref<StoryFile[]>([]);

	const stories = ref<Story[]>([]);

	return {
		files,
		stories,

		set(update: StoryFile[]) {
			files.value = update;

			files.value.map(async file => {
				await this.update(file);
			});
		},

		async update(file: StoryFile) {
			const existingIndex = stories.value.findIndex(({ id }) => id === file.id);

			/** @todo fix run result not being up to date */
			const props = await run(file);

			const markdown = new MarkdownIt();

			if (!props) {
				console.error(`Could not load props for: ${file.file}`);
				return;
			}

			const update: Story = {
				...file,
				pendingUpdates: false,
				docsHtml: file.component.__docs && `${markdown.render(file.component.__docs)}`,
				props,
			};

			if (existingIndex !== -1) {
				stories.value[existingIndex] = update;
			} else {
				stories.value.push(update);
			}

			return update;
		},
	};
});
