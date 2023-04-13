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
		padding: spacing(4);
		width: 100%;
		position: absolute;

		h2 {
			font-size: 1.25rem;
			font-weight: 500;
		}
	}
</style>
