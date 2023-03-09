<template>
	<button
		class="btn"
		type="button"
		:disabled="disabled"
		:class="{
			[`btn-color-${color}`]: color,
		}">
		<slot />
	</button>
</template>

<script lang="ts" setup>
	export interface ExampleButtonProps {
		color?: 'primary' | 'danger' | 'neutral';
		disabled?: boolean;
	}

	withDefaults(defineProps<ExampleButtonProps>(), {
		color: 'neutral',
		disabled: false,
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

	.btn[disabled] {
		opacity: 0.35;
	}

	.btn-color-neutral {
		background: #e4e4e4;
		color: black;
	}

	.btn-color-danger {
		background: #ff9494;
		color: #710e0e;
	}

	.btn-color-primary {
		background: #c994ff;
		color: #4e0f8d;
	}
</style>
