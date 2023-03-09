declare module '$peachy-stories' {
	import type { StoryFile } from './src/types';

	export const rawFiles: StoryFile[];

	export const onUpdate: (callback: (story: StoryFile[]) => void | Promise<void>) => void;
}
