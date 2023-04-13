<template>
	<slot />
</template>

<script lang="ts" setup>
	import { inject, useSlots } from 'vue';
	import type { VariantProps, AddVariantInput } from '../../types';

	const props = defineProps<VariantProps>();

	const addVariant = inject<(variant: AddVariantInput) => void | undefined>('addVariant');

	const slots = useSlots();

	addVariant?.({
		slots: slots.default?.(),
		props,
	});
</script>
