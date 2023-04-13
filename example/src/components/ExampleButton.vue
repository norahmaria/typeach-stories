<template>
	<button
		class="btn"
		type="button"
		:class="{
			[`btn-${color}`]: color,
		}">
		<!-- @slot Icon -->
		<slot />
	</button>
</template>

<script lang="ts" setup>
	export interface ExampleButtonProps {
		color?: 'neutral' | 'primary' | 'danger';
	}

	withDefaults(defineProps<ExampleButtonProps>(), {
		color: 'neutral',
	});
</script>

<style lang="scss">
	.btn {
		padding: 1rem 2rem;
		border-radius: 4px;

		font-weight: 600;

		cursor: pointer;
		border: none;

		&:hover {
			transform: scale(1.1);
		}
	}

	.btn-neutral {
		background: #e4e4e4;
		color: black;
	}

	.btn-primary {
		background: #cb97ff;
		color: #440c7c;
	}

	.btn-danger {
		background: #ff9494;
		color: #710e0e;
	}
</style>
