<template>
	<div v-if="!story" :class="$class('not-found')">No story found</div>

	<div v-else :class="$class()">
		<div :class="$class('component')">
			<component ref="component" :is="{ ...story.component }" :key="story.id" />
		</div>

		<div v-if="story.docsHtml" v-html="story.docsHtml" />
	</div>
</template>

<script setup lang="ts">
	import { computed, ref, provide } from 'vue';

	import { useRoute } from 'vue-router';

	import { useStories } from '../stores/stories';

	const stories = useStories();

	const route = useRoute();

	const component = ref();

	provide('addStory', undefined);
	provide('addVariant', undefined);

	const story = computed(() => stories.stories.find(it => it.id === route.params.id));
</script>

<style lang="scss">
	.story {
		padding: spacing(4);
		background-color: $white;
		height: 100%;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 10px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

		@include border-radius(2);

		&__component {
			width: 100%;
			display: grid;
			place-content: center;
			height: minmax(max-content, 40vh);
			padding: spacing(12) spacing(8);
		}
	}
</style>
