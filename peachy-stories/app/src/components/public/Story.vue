<template>
	<slot />
</template>

<script lang="ts" setup>
	import { inject } from 'vue';
	import type { StoryProps } from '../../types';

	const props = defineProps<StoryProps>();

	const addStory = inject<(story: StoryProps) => void | undefined>('addStory');

	addStory?.({
		title: props.title,
	});
</script>
