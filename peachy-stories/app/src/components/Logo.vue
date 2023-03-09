<template>
	<RouterLink to="/">
		<div :class="$class()"><Grid /> {{ title }}</div>
	</RouterLink>
</template>

<script lang="ts" setup>
	import { RouterLink } from 'vue-router';
	import Grid from '../assets/Grid.svg?component';

	export interface LogoProps {
		title: string;
	}

	defineProps<LogoProps>();
</script>

<style lang="scss">
	.logo {
		display: flex;
		align-items: center;
		gap: spacing();
		color: $blueish-gray-800;

		svg path {
			stroke: $blueish-gray-800;
		}
	}
</style>
