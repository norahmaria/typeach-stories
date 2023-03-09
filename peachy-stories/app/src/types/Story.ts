import type { StoryFile } from './StoryFile';
import type { StoryProps } from './StoryProps';

export interface Story extends StoryFile {
	props: StoryProps;
	docsHtml?: string;
}
