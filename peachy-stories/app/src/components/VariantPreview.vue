<template>
	<div :class="$class()">
		<div :class="$class('title')">
			{{ props.props.title }}
		</div>

		<div :class="$class('live-wrapper')">
			<div :class="$class('live-component')" ref="preview">
				<component :is="component" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, computed, onMounted } from 'vue';
	import type { Variant } from '../types';

	const props = defineProps<Variant>();

	const preview = ref<HTMLDivElement>();

	const size = computed(() => {
		const { height, width } = preview.value?.getBoundingClientRect() ?? {};

		return {
			height: height ? `${height}px` : 'auto',
			width: width ? `${width}px` : 'auto',
		};
	});
</script>

<style lang="scss" scoped>
	.variant-preview {
		display: flex;
		flex-direction: column;
		gap: spacing(3);

		cursor: pointer;

		&__title {
			font-size: 1rem;
			font-weight: 500;
		}

		&__live {
			&-component {
				position: absolute;
				transform: scale(0.75);
				transform-origin: top left;
				pointer-events: none;
			}

			&-wrapper {
				width: v-bind('size.width');
				height: v-bind('size.height');
			}
		}
	}
</style>
