<script setup lang="ts">
	import ExampleButton from './components/ExampleButton.vue';
</script>

<template>
	<main>
		<ExampleButton>Home</ExampleButton>
	</main>
</template>

<style scoped>
	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		place-content: center;
	}
</style>
