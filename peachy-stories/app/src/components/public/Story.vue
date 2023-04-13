<template>
	<slot />
</template>

<script lang="ts" setup>
	import { inject, useSlots } from 'vue';
	import type { StoryProps, AddStoryInput } from '../../types';

	const props = defineProps<StoryProps>();

	const addStory = inject<(story: AddStoryInput) => void | undefined>('addStory');

	const slots = useSlots();

	addStory?.({
		slots: slots.default?.(),
		props,
	});
</script>
