import type { VNode } from 'vue';

export interface VariantProps {
	title: string;
}

export interface Variant {
	props: VariantProps;
	id: string;
	component: VNode;
}

export interface AddVariantInput {
	props: VariantProps;
	slots?: VNode[];
}
