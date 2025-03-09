import Redscrolls from '$lib/classes/Redscrolls.js';
import Server from '$lib/classes/Server.js';
import { serverPB } from '../../../hooks.server.js';

export async function POST(event) {
	const body = await event.request.json();

	// { userMessage, agentMessage, state, sessionId }
	const missingKeys = Redscrolls.api.assertFields({
		object: body,
		fields: ['userMessage', 'agentMessage', 'state', 'sessionId']
	});
	if (missingKeys.length) {
		return new Response(JSON.stringify({ message: `Missing keys: ${missingKeys.join(', ')}` }), {
			status: 400
		});
	}
	const { userMessage, agentMessage, state, sessionId } = body;

	const session = await serverPB.collection('sessions').getOne(sessionId);

	if (!session)
		return new Response(JSON.stringify({ message: 'Session not found' }), { status: 404 });

	await Server.chat.createPlayerChat({
		currentState: state,
		userMessage: userMessage,
		sessionId
	});

	// Run asynchroneous so we can return success
	// Without blocking the response
	Server.chat.createAgentChat({
		currentState: state,
		userMessage,
		previousAgentMessage: agentMessage,
		sessionId
	});

	console.log('Returning success');
	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
