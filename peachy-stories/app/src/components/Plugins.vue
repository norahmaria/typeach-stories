<template>
	<div :class="$class()">Plugins</div>
</template>

<script lang="ts" setup>
	import { useStories } from '../stores/stories';

	const stories = useStories();
</script>

<style lang="scss">
	.plugins {
		z-index: 8;
		overflow-y: scroll;

		height: 100%;
		// width: minmax(10rem, 30rem);
		width: 35rem;

		padding: spacing(4);

		background-color: $white;
		box-shadow: rgba(15, 15, 15, 0.015) 0px 0px 0px 1px,
			rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px;

		@include border-radius(2);

		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
