// TODO: Need to standardize the models

// - Use plurals for base models and m2m relationships
// - Use singular for 1-1 relationships
// - Any free-form kinds of data (like status or metadata) should always have "key" and "value" fields

class Themer {
	static themeTemplates = {
		rpg: {
			sessionTemplate: {},
			characterTemplate: {
				metadata: [
					{
						key: 'race',
						default: 'Human'
					},
					{
						key: 'class',
						default: 'Fighter'
					}
				],
				status: [
					{
						key: 'hp',
						value: 10,
						max: 10
					},
					{
						key: 'ac',
						value: 0,
						max: 0
					},
					{
						key: 'xp',
						value: 0,
						max: 0
					},
					{
						key: 'lv',
						value: 1,
						max: 0
					}
				]
			}
		}
	};

	static tools = {
		enforceTheme: ({ theme, session }: { theme: string; session: any }) => {
			const _theme = Themer.themeTemplates[theme] || null;
			if (!_theme) {
				console.error(`Theme ${theme} not found`);
				return session;
			}

			// Enforce session template
			// Enforce character template
			if (!session.character) {
				console.log('No character on session.');
			} else {
				session.character.metadata = Themer.tools.projectKeys({
					existing: session.character.metadata,
					template: _theme.characterTemplate.metadata
				});

				console.log('Status', session.character.status);
				session.character.status = Themer.tools.projectKeys({
					existing: session.character.status,
					template: _theme.characterTemplate.status
				});
			}

			return session;
		},
		projectKeys: ({ existing, template }: { existing: any; template: any }) => {
			// Check if the existing object has all of the keys in the template,
			// If not, add them with the default value
			console.log('input object', existing);
			let temp = [...existing];
			console.log('temp', temp);

			// Add missing keys
			template.forEach((t: any) => {
				if (!temp.find((e: any) => e.key === t.key)) {
					temp.push(t);
				}
			});

			// Remove duplicates by key, sorting by updated field
			temp = temp
				.sort((a: any, b: any) => {
					if (a.updated < b.updated) return -1;
					if (a.updated > b.updated) return 1;
					return 0;
				})
				.filter((item: any, index: number, self: any) => {
					return index === self.findIndex((t: any) => t.key === item.key);
				});

			return temp;
		}
	};
}

export default Themer;
