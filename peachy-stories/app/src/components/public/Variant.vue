<template>
	<slot />
</template>

<script lang="ts" setup>
	import { inject, useSlots } from 'vue';
	import type { VariantProps } from '../../types';

	const props = defineProps<VariantProps>();

	const addVariant =
		inject<(variant: VariantProps, data: any) => void | undefined>('addVariant');

	const slots = useSlots();

	addVariant?.(
		{
			title: props.title,
		},
		slots
	);
</script>
