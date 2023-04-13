<template>
	<NavigationTree />

	<main>
		<RouterView />
	</main>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router';

	import { rawFiles, onUpdate } from '$peachy-stories';
	import { useFiles } from './stores/files';

	import NavigationTree from './components/Sidebar.vue';

	const files = useFiles();

	files.set(rawFiles);

	onUpdate(updatedFiles => {
		updatedFiles.map(file => files.addOrUpdate(file));

		if (import.meta.hot) {
			import.meta.hot.send('$peachy-stories/updates-resolved', updatedFiles);
		}
	});
</script>

<style lang="scss">
	main {
		background-color: $white;
		overflow-y: scroll;

		box-shadow: 0px 20px 25px -5px rgba(16, 24, 40, 0.1),
			0px 8px 10px -6px rgba(16, 24, 40, 0.1);

		@include border-radius(2);
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
