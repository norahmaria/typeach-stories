<template>
	<RouterLink to="/" :class="$class()"> <Grid /> {{ title }} </RouterLink>
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
		font-size: 1rem;

		svg path {
			stroke: $blueish-gray-800;
		}
	}
</style>
