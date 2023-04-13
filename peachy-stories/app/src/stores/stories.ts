import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

import MarkdownIt from 'markdown-it';

import type { AddStoryInput, AddVariantInput, Story, StoryFile } from '../types';

export const useStories = defineStore('stories', () => {
	const stories = ref<Story[]>([]);

	const markdownIt = new MarkdownIt();

	watch(
		stories,
		update => {
			console.log('STORIES', update);
		},
		{
			immediate: true,
		}
	);

	return {
		stories,

		addStory(story: AddStoryInput, file: StoryFile) {
			const existingIndex = stories.value.findIndex(({ id }) => id === file.id);

			const docsHtml = file.component.__docs
				? markdownIt.render(file.component.__docs)
				: undefined;

			const update: Story = {
				...file,
				props: story.props,
				variants: [],
				docsHtml,
			};

			if (existingIndex !== -1) {
				stories.value[existingIndex] = update;
			} else {
				stories.value.push(update);
			}
		},

		addVariant(variant: AddVariantInput, file: StoryFile) {
			const story = stories.value.find(({ id }) => id === file.id);

			if (!story) {
				return console.error(`No story found for id: ${file.id}.`);
			}

			const generateId = () => `${file.id}-${story.variants.length}`;

			const existing = story.variants.find(({ id }) => id === generateId());

			if (!variant.slots) {
				return console.error(
					`Variation ${variant.props.title} of ${story.props.title} not found`
				);
			}

			if (existing) {
				Object.assign(existing, {
					...existing,
					props: variant.props,
					component: variant.slots[0],
				});
			} else {
				story.variants.push({
					props: variant.props,
					id: `${file.id}-${story.variants.length}`,
					component: variant.slots[0],
				});
			}
		},
	};
});
