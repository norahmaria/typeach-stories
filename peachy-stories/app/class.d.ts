interface ClassOptions {
	[key: string]: boolean | string;
}

interface Class {
	[key: string]: boolean;
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$class: (...classes: (string | ClassOptions)[]) => Class;
	}
}

export {};
