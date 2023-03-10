import { createApp, h } from 'vue';

import Story from './components/public/Story.vue';
import Variant from './components/public/Variant.vue';
import type { StoryFile, StoryProps, VariantProps } from './types';

export const run = (file: StoryFile): StoryProps | undefined => {
	let result: StoryProps | undefined;

	const app = createApp({
		provide: {
			addStory(props: StoryProps) {
				result = props;
			},

			addVariant(variantProps: VariantProps, data: any) {
				/** @todo */
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

	return result;
};
