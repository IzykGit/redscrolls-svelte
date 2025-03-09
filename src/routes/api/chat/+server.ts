import Deepseek from '$lib/classes/Deepseek.js';
import Redscrolls from '$lib/classes/Redscrolls.js';

export async function POST(event) {
	const { message, state, sessionId } = await event.request.json();

	if (!message)
		return new Response(JSON.stringify({ message: 'Did not find message' }), { status: 400 });
	if (!sessionId)
		return new Response(JSON.stringify({ message: 'Did not find sessionId' }), { status: 400 });

	const session = await Redscrolls.pb.collection('sessions').getOne(sessionId);

	if (!session)
		return new Response(JSON.stringify({ message: 'Session not found' }), { status: 404 });

	// ========================================
	// Create the chat event for the player's input
	// ========================================
	{
		// TODO: Move this into a helper function
		// Create the chat event for the player's input
		const playerChatEvent = await Redscrolls.pb.collection('chat_events').create();
		await Promise.all([
			// Create the message and state for the player's input
			Redscrolls.pb.collection('messages').create({
				message,
				author: 'player',
				chat_event: playerChatEvent.id
			}),
			// Create the state for the player's input
			Redscrolls.pb.collection('states').create({
				state,
				chat_event: playerChatEvent.id
			})
		]);

		// Update the session with the new chat entry.
		await Redscrolls.pb.collection('sessions').update(sessionId, {
			chat_events: [...session.chat_events, playerChatEvent.id]
		});
	}

	const generate = async () => {
		// ========================================
		// Create the chat event for the AI's response
		// ========================================
		// TODO: The generate function should be moved into a helper function
		// Generate the response from Deepseek
		// TODO: Make an official method for handling a chat response completion
		const agentResponse = await Deepseek.testCompletion(message);

		// Create entry and update the session with the new chat entry.
		const agentChatEvent = await Redscrolls.pb.collection('chat_events').create();
		await Redscrolls.pb.collection('session').update(sessionId, {
			chat_events: [...session.chat_events, agentChatEvent.id]
		});

		// Create the message for the AI's response
		await Redscrolls.pb.collection('messages').create({
			message: agentResponse,
			author: 'player',
			chat_event: agentChatEvent.id
		});

		// Create the new state from the response
		// TODO: Write a completion method to generate the state
		const stateId = await Redscrolls.pb.collection('states').create({
			state: state,
			chat_event: agentChatEvent.id
		});

		// Update the agentChatEvent with the new state
		await Redscrolls.pb.collection('chat_events').update(agentChatEvent.id, {
			state: stateId
		});
	};

	// EXPECTED:
	// - Fetch the session
	// - Call Gen Player Chat Event
	// - Call Gen AI Chat Event
	// - Return success

	// Don't await this, we don't want to block the response
	generate();

	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
