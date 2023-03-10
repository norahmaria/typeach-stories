import { ref } from 'vue';
import { defineStore } from 'pinia';

import MarkdownIt from 'markdown-it';

import type { Story, StoryFile } from '../types';
import { run } from '../run';

export const useStories = defineStore('stories', () => {
	const files = ref<StoryFile[]>([]);

	const stories = ref<Story[]>([]);

	const update = (file: StoryFile) => {
		const existingIndex = stories.value.findIndex(({ id }) => id === file.id);

		const props = run(file);

		const markdown = new MarkdownIt();

		if (!props) {
			console.error(`Could not load props for: ${file.file}`);
			return;
		}

		const _update: Story = {
			...file,
			pendingUpdates: false,
			docsHtml: file.component.__docs && `${markdown.render(file.component.__docs)}`,
			props,
		};

		if (existingIndex !== -1) {
			stories.value[existingIndex] = _update;
		} else {
			stories.value.push(_update);
		}

		return update;
	};

	const set = (_update: StoryFile[]) => {
		files.value = _update;

		files.value.map(file => update(file));
	};

	return {
		files,
		stories,

		set,

		update,
	};
});
