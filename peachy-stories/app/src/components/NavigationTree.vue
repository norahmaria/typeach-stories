<template>
	<div :class="$class()">
		<Logo title="Peachy Stories" />

		<nav :class="$class('nav')">
			<RouterLink
				v-for="story of stories.stories"
				:key="story.id"
				:to="`/story/${story.id}`">
				{{ story.props.title }}
			</RouterLink>
		</nav>
	</div>
</template>

<script lang="ts" setup>
	import { RouterLink } from 'vue-router';
	import { useStories } from '../stores/stories';

	import Logo from './Logo.vue';

	const stories = useStories();
</script>

<style lang="scss">
	.navigation-tree {
		padding: spacing(4);

		width: 14rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		&__nav {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
