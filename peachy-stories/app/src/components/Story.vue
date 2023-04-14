<template>
	<div :class="$class()" v-if="story">
		<Toolbar :title="story.props.title" />

		<div :class="$class('playground')">
			<component
				v-bind="state"
				:is="playground?.component"
				:key="`${playground?.id}-playground`" />
		</div>

		<div :class="$class('variants')" v-if="story.variants.length">
			<VariantPreview
				v-for="variant of story.variants"
				v-bind="variant"
				:key="variant.id"
				@click="onSetVariant(variant.id)" />
		</div>

		<div :class="$class('docs')" v-if="story.docsHtml" v-html="story.docsHtml" />
	</div>

	<div v-else class="empty-story">Could not find story.</div>
</template>

<script setup lang="ts">
	import { computed, ref, provide, watch } from 'vue';
	import { useRoute } from 'vue-router';

	import type { Story, Variant } from '../types';
	import { useStories } from '../stores/stories';

	import VariantPreview from './VariantPreview.vue';
	import Toolbar from './Toolbar.vue';

	const stories = useStories();

	const route = useRoute();

	provide('addStory', undefined);
	provide('addVariant', undefined);

	const story = computed<Story | undefined>(() =>
		stories.stories.find(it => it.id === route.params.id)
	);

	const playground = ref<Variant | undefined>(story.value?.variants[0]);

	const state = ref(story.value?.variants[0].component.props);

	const onSetVariant = (variantId: string) => {
		const variant = story.value?.variants.find(({ id }) => id === variantId);

		playground.value = variant;
		state.value = variant?.component.props;
	};

	watch(story, () => {
		playground.value = story.value?.variants[0];
	});
</script>

<style lang="scss">
	.empty-story {
		display: grid;
		place-content: center;
		height: 100%;
		opacity: 0.75;
	}

	.story {
		overflow-y: scroll;
		background-color: $white;
		height: 100%;

		&__playground {
			display: grid;
			place-content: center;

			height: minmax(max-content, 40vh);
			width: 100%;

			padding: spacing(36) spacing(8) spacing(26) spacing(8);
			border-bottom: 1px solid $blueish-gray-200;
		}

		&__variants {
			position: relative;
			overflow-x: auto;

			display: flex;
			gap: spacing(4);
			padding: spacing(8) spacing(8) spacing(4) spacing(8);
		}

		&__docs {
			padding: spacing(4) spacing(8) spacing(8) spacing(8);
		}
	}
</style>
