import { getCurrentInstance } from 'vue';

interface Options {
	[key: string]: boolean | string;
}

interface Class {
	[key: string]: boolean;
}

const toKebabCase = (name: string): string =>
	name.replace(/([A-Za-z])([A-Z])/g, '$1-$2').toLowerCase();

const filterToStrings = (element: string | Options): element is string =>
	typeof element === 'string';

const filterToObjects = (element: string | Options): element is Options =>
	typeof element === 'object';

const isVariant = (element: string | boolean): element is string =>
	typeof element === 'string';

const isBoolean = (element: string | boolean): element is boolean =>
	typeof element === 'boolean';

const getClassObject = (classes: string[], options: Options): Class => {
	const name = classes.join('__');

	const object = { [name]: true };

	Object.keys(options).forEach(key => {
		const value = options[key];

		if (isVariant(value)) {
			object[`${name}--${value}`] = true;
		}

		if (isBoolean(value)) {
			object[`${name}--${key}`] = value;
		}
	});

	return object;
};

export const $class = (...classes: (string | Options)[]) => {
	const component = getCurrentInstance();

	const name = component?.type?.__name ?? 'no-name';

	const names = [toKebabCase(name), ...classes].filter(filterToStrings);

	const [options] = classes.filter(filterToObjects);

	return getClassObject(names || [], options || []);
};
