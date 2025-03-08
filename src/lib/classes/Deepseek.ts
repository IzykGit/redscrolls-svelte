import { PRIVATE_DEEPSEEK_API_URL, PRIVATE_DEEPSEEK_API_KEY } from '$env/static/private';
import type { IChat } from '$lib/@types/ChatInterface';

class Deepseek {
	static model = 'deepseek-chat';
	static url = PRIVATE_DEEPSEEK_API_URL || 'https://api.deepseek.com';
	static token = PRIVATE_DEEPSEEK_API_KEY;

	async chatFactory({ userMessage, lastMessage, stateMessage }: IChat) {
		return [
			// the prompt that explains how it uses the state, also provides the state, will have a second condensed version
			{ role: 'system', content: stateMessage },
			// the users message
			{ role: 'user', content: userMessage },
			// last thing assistant said
			{ role: 'assistant', content: lastMessage }
		];
	}

	static async testCompletion(message: string) {
		const baseUrl = this.url;

		const body = {
			model: this.model,
			messages: [{ role: 'user', content: message }]
		};

		const response = await fetch(baseUrl + '/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.token
			},
			body: JSON.stringify(body)
		}).then((res) => res.json());
		console.log('Response', response);
		return (
			response?.choices?.find((choice: any) => choice.index === 0)?.message?.content ||
			'No response'
		);
	}
}

export default Deepseek;
