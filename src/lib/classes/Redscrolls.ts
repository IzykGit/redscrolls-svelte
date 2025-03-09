import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

class Redscrolls {
	instance: Redscrolls | null = null;

	static pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	constructor() {
		if (this.instance) return this.instance;
		this.instance = this;
	}

	static api = {
		/**
		 * Asserts that the fields are present in the object.
		 * @note This will only work on the first level of the object.
		 * @returns An array of missing keys
		 * @usage assertFields({key: 'value', ['key', 'key2']) -> ['key2']
		 */
		assertFields({ object, fields }: { object: { [key: string]: unknown }; fields: string[] }) {
			const missingKeys: string[] = [];
			fields.some((key) => {
				if (!object[key]) {
					missingKeys.push(key);
					return true;
				}
			});
			return missingKeys;
		}
	};
}

export default Redscrolls;
