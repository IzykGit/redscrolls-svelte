class Global {
	instance: Global | null = null;

	constructor() {
		if (this.instance) return this.instance;
		this.instance = this;
	}

	static tools = {
		/**
		 * Creates an object by populating it with properties from a template and default values.
		 *
		 * @param {Object} object - The object to be populated.
		 * @param {Object} template - The template object containing default properties.
		 * @returns {Object} The populated object.
		 * @usage This method is useful for creating objects with default values.
		 * @example const object = Global.tools.objectFactory({}, { key: "value" }, { key: "default" });
		 * @throws {Error} If any property in the template is missing in the object and defaults.
		 */
		// objectFactory(object, template) {
		//     // Populate the object with the template and defaults
		//     for (let key in template) {

		//         // If the property is missing, populate it with the default
		//         if (object[key] === undefined) {
		//             object[key] = defaults[key] || template[key];
		//         }

		//         // If any are missing, throw an error to indicate the missing properties
		//         if (object[key] === undefined) {
		//             throw new Error("Object is missing variable");
		//         }
		//     }

		//     // Return the populated object
		//     return object;
		// },
		// assertType(value, type) {
		//     if (typeof value !== type) {
		//         throw new Error(`Value must be of type ${type}`);
		//     }
		// },
		// assertTypes(object, types) {
		//     for (let key in object) {
		//         if (typeof object[key] !== types[key]) {
		//             throw new Error(`Value must be of type ${types[key]}`);
		//         }
		//     }
		// }
		concatExpansionFields(fields: string[]) {
			return fields.join(',');
		},
		// traverse object, look for expand then spread it into the object
		// TODO: This doesn't expand correctly.
		//  - Maybe rethink how we're spreading the object and instead create a scaffold
		//  - Then populate the scaffold with the expanded object resulting in a constructed new object
		traverseExpansions(obj: any) {
			console.group('Traverse Expansions', origin);
			for (const key in obj) {
				if (typeof obj[key] === 'object') {
					obj[key] = Global.tools.traverseExpansions(obj[key]);
				}

				if (key == 'expand') {
					obj = { ...obj, ...obj[key] };
				}
			}

			delete obj.expand;
			console.groupEnd();
			// console.log("This is the obj:", obj)
			return obj;
		},

		sessionFactory(session: any) {
			console.log('Session', session);
			const res = { ...session };

			res.character = { ...session.expand.character };

			return res;
		},

		/**
		 * Traverses an object and deletes any fields specified.
		 */
		cullFields(obj: any, fields: string[]) {
			for (const key in obj) {
				if (fields.includes(key)) {
					// Delete the field if it is in the list of fields to cull
					delete obj[key];
				}
				if (typeof obj[key] === 'object') {
					obj[key] = Global.tools.cullFields(obj[key], fields);
				}
			}
			return obj;
		},
		// Traverse the object, replace the keys with just the first letter of the key or a
		// dot separated string of the first letters of the keys that lead to the value
		objectMinifier(obj: any) {
			const newObj = {} as any;
			for (const key in obj) {
				const newKey = key.substring(0, 2);
				if (typeof obj[key] === 'object') {
					newObj[newKey] = Global.tools.objectMinifier(obj[key]);
				} else {
					newObj[newKey] = obj[key];
				}
			}
			return newObj;
		}
	};
}

export default Global;
