import type { VNode } from 'vue';
import type { StoryFile } from './StoryFile';
import type { Variant } from './Variant';

export interface StoryProps {
	title: string;
}

export interface Story extends StoryFile {
	props: StoryProps;
	docsHtml?: string;
	variants: Variant[];
}

export interface AddStoryInput {
	props: StoryProps;
	slots?: VNode[];
}
