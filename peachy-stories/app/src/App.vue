<template>
	<NavigationTree />

	<main>
		<RouterView />
	</main>
</template>

<script setup lang="ts">
	import { provide, nextTick } from 'vue';
	import { RouterView } from 'vue-router';

	import { rawFiles, onUpdate } from '$peachy-stories';
	import { useStories } from './stores/stories';

	import NavigationTree from './components/NavigationTree.vue';

	const stories = useStories();

	stories.set(rawFiles);

	provide('addStory', undefined);
	provide('addVariant', undefined);

	onUpdate(async updatedStories => {
		await nextTick();

		await Promise.all(updatedStories.map(story => stories.update(story)));

		if (import.meta.hot) {
			import.meta.hot.send('$peachy-stories/updates-resolved', updatedStories);
		}
	});
</script>

<style lang="scss">
	#app {
		display: grid;
		grid-template-columns: auto 1fr;
		height: calc(100vh - 2rem);
		margin: 1rem;
	}
</style>
