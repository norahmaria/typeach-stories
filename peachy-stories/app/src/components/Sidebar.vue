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
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: spacing(4);

		width: minmax(12rem, 18rem);
		padding: spacing(4);

		background: rgb(251, 251, 250);
		border-right: 1px solid #f2f2f1;

		&__nav {
			display: flex;
			flex-direction: column;
			gap: spacing(2);

			font-size: 0.85rem;

			.router-link-active {
				font-weight: 600;
			}
		}
	}
</style>
