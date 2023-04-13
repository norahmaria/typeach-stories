import { createApp, h } from 'vue';

import Story from './components/public/Story.vue';
import Variant from './components/public/Variant.vue';

import type { AddStoryInput, AddVariantInput, StoryFile } from './types';

import { useStories } from './stores/stories';

export const run = (file: StoryFile) => {
	const stories = useStories();

	const app = createApp({
		provide: {
			addStory(context: AddStoryInput) {
				stories.addStory(context, file);
			},

			addVariant(context: AddVariantInput) {
				stories.addVariant(context, file);
			},
		},

		render() {
			return h({ ...file.component });
		},
	});

	const el = window.document.createElement('div');

	app.component('Story', Story);
	app.component('Variant', Variant);

	app.mount(el);

	app.unmount();

	el.remove();
};
