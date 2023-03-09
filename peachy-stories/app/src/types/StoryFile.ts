export interface StoryFile {
	id: string;
	file: string;
	pendingUpdates: boolean;
	component: {
		__name: string;
		__docs?: string;
		__hmrId: string;
		__file: string;
	};
}
