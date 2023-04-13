import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { StoryFile } from '../types';
import { run } from '../run';

export const useFiles = defineStore('files', () => {
	const files = ref<StoryFile[]>([]);

	return {
		files,

		addOrUpdate: (file: StoryFile) => {
			const existingIndex = files.value.findIndex(({ id }) => id === file.id);

			run(file);

			const update: StoryFile = {
				...file,
				pendingUpdates: false,
			};

			if (existingIndex !== -1) {
				files.value[existingIndex] = update;
			} else {
				files.value.push(update);
			}

			return update;
		},

		set(updatedFiles: StoryFile[]) {
			updatedFiles.map(file => this.addOrUpdate(file));
		},
	};
});
