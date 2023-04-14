<template>
	<main>
		<Sidebar />

		<RouterView />

		<Plugins />
	</main>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router';

	import { rawFiles, onUpdate } from '$peachy-stories';
	import { useFiles } from './stores/files';

	import Sidebar from './components/Sidebar.vue';
	import Plugins from './components/Plugins.vue';

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
		display: flex;
		overflow: hidden;

		height: 100vh;

		.sidebar,
		.plugins {
			flex-shrink: 0;
			height: 100%;
		}
	}
</style>
