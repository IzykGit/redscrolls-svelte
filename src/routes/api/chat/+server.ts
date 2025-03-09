import Deepseek from '$lib/classes/Deepseek.js';
import Redscrolls from '$lib/classes/Redscrolls.js';

export async function POST(event) {
	const { message, sessionId } = await event.request.json();

	if (!message)
		return new Response(JSON.stringify({ message: 'Did not find message' }), { status: 400 });
	if (!sessionId)
		return new Response(JSON.stringify({ message: 'Did not find sessionId' }), { status: 400 });

	const session = await Redscrolls.pb.collection('session').getOne(sessionId);

	if (!session)
		return new Response(JSON.stringify({ message: 'Session not found' }), { status: 404 });

	// Create a new chat entry from the user.
	const _input = await Redscrolls.pb.collection('responses').create({
		input_text: message,
		response_text: message,
		model: 'deepseek'
	});

	// Prompt Deepseek for a response
	const response = await Deepseek.testCompletion(message);

	console.log('Response', response);

	// Create a new chat entry
	const _response = await Redscrolls.pb.collection('responses').create({
		input_text: message,
		response_text: response,
		model: 'deepseek'
	});

	// Update the session with the new chat entry.
	await Redscrolls.pb.collection('session').update(sessionId, {
		chat_history: [...session.chat_history, _input.id, _response.id]
	});

	return new Response(JSON.stringify(response), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
