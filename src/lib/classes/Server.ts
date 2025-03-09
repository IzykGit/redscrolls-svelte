import type { RecordModel } from 'pocketbase';
import { serverPB } from '../../hooks.server';
import Deepseek from './Deepseek';

import SysPrompt from '$lib/data/SysPrompt';

// the chat event is one giant message, as array

// chat event has two parts, one message, and the other is the chat state

// the state and the message are generated async

// the message comes through first

// the state updates in the background

// the user sends, loads, agent is formulating message, attach message to chat event, the backend sends message to the frontend, the frontend loads,
// the agent uses the deepseek response to create

class Server {
	instance: Server | null = null;

	cosntructor() {
		if (this.instance) return this.instance;
		this.instance = this as any;
	}

	static chat = {
		async createPlayerChat({
			userMessage,
			currentState,
			sessionId
		}: {
			userMessage: string;
			currentState: any;
			sessionId: string;
		}) {
			// creating a player chat event and waiting for the response
			const playerChatEvent = await serverPB.collection('chat_events').create();
			const [playerMessage, playerState] = await Promise.all([
				// Create the message and state for the player's input
				serverPB.collection('chat_messages').create({
					message: userMessage,
					author: 'player',
					chat_event: playerChatEvent.id
				}),
				// Create the state for the player's input
				serverPB.collection('chat_states').create({
					state: currentState,
					chat_event: playerChatEvent.id
				})
			]);

			// Update the session with the new chat entry.
			await Promise.all([
				serverPB.collection('sessions').update(sessionId, {
					'events+': playerChatEvent.id
				}),
				serverPB.collection('chat_events').update(playerChatEvent.id, {
					complete: true,
					message: playerMessage.id,
					state: playerState.id
				})
			]);

			return playerChatEvent;
		},

		async createAgentChat({
			currentState,
			userMessage,
			previousAgentMessage,
			sessionId
		}: {
			currentState: object;
			userMessage: string;
			previousAgentMessage: string;
			sessionId: string;
		}) {
			// ========================================
			// Setup Variables
			// ========================================

			// Create the chat event
			const agentChatEvent = await serverPB.collection('chat_events').create({
				complete: false
			});

			// Add the agent chat event to the session
			await serverPB.collection('sessions').update(sessionId, {
				// Append the new chat event to the session
				'events+': agentChatEvent.id
			});

			const storyPrompt = {
				...SysPrompt.themes.fantasyRPG.storyPrompt,
				messages: [previousAgentMessage, userMessage],
				state: currentState
			};

			const statePrompt = {
				...SysPrompt.themes.fantasyRPG.statePrompt,
				messages: [previousAgentMessage, userMessage],
				state: currentState,
				template: {}
			};

			// ========================================
			// Handle Agent Chat
			// ========================================
			const agentResponse = await Deepseek.completion(JSON.stringify(storyPrompt));

			const agentMessage = await serverPB.collection('chat_messages').create({
				message: agentResponse.message,
				message_id: agentResponse.message_id,
				chat_event: agentChatEvent.id,
				author: 'agent',
				ai_id: 'deepseek',
				input_tokens: agentResponse.prompt_tokens,
				output_tokens: agentResponse.completion_tokens,
				usage_statistics: agentResponse.usage_statistics,
				cache_hit_tokens: agentResponse.prompt_cache_hit_tokens,
				cache_miss_tokens: agentResponse.prompt_cache_miss_tokens
			});

			// Update the chat event with the agent's response message id
			await serverPB.collection('chat_events').update(agentChatEvent.id, {
				message: agentMessage.id
			});

			// ========================================
			// Handle Agent State
			// ========================================

			// Generate the state from the AI
			const agentState = await Deepseek.completion(JSON.stringify(statePrompt));
			const agentStateMessage = agentState.message;

			// Split the text at newlines and remove the first and last lines
			const trimmed = agentStateMessage
				.substring(agentStateMessage.indexOf('{'), agentStateMessage.lastIndexOf('}') + 1)
				.trim();

			let parsed = currentState;
			try {
				parsed = JSON.parse(trimmed);
			} catch (e) {
				console.error('Error parsing state', e);
			}
			console.log('parsed state', typeof parsed, parsed);

			// Create the state for the AI's response
			const state = await serverPB.collection('chat_states').create({
				state: parsed,
				chat_event: agentChatEvent.id
			});

			// Update the agentChatEvent with the new state
			await serverPB.collection('chat_events').update(agentChatEvent.id, {
				state: state.id,
				complete: true
			});
		}
	};
}

export default Server;
