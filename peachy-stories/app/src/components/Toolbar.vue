<template>
	<div :class="$class()">
		<h2>{{ title }}</h2>
	</div>
</template>

<script lang="ts" setup>
	export interface ToolbarProps {
		title: string;
	}

	defineProps<ToolbarProps>();
</script>

<style lang="scss">
	.toolbar {
		z-index: 4;
		position: absolute;
		width: 100%;

		padding: spacing(4);
		background-color: $white;
		border-bottom: 1px solid $blueish-gray-200;

		h2 {
			font-size: 1.25rem;
			font-weight: 500;
		}
	}
</style>
