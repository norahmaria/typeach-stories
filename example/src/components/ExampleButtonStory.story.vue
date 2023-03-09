<template>
	<Story title="Button Variants">
		<Variant title="primary">
			<ExampleButton color="primary"> Hello Again </ExampleButton>
		</Variant>

		<Variant title="danger">
			<ExampleButton color="danger"> Hello Again </ExampleButton>
		</Variant>
	</Story>
</template>

<docs lang="md">
# Ok

- No more
</docs>

<script lang="ts" setup>
	import ExampleButton from './ExampleButton.vue';
</script>
