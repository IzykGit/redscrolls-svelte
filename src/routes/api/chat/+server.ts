import Deepseek from '$lib/classes/Deepseek.js';
import Redscrolls from '$lib/classes/Redscrolls.js';
import Server from '$lib/classes/Server.js';
import { serverPB } from '../../../hooks.server.js';

export async function POST(event) {
    const { message, state, sessionId } = await event.request.json();

    if (!message)
        return new Response(JSON.stringify({ message: 'Did not find message' }), { status: 400 });
    if (!sessionId)
        return new Response(JSON.stringify({ message: 'Did not find sessionId' }), { status: 400 });

    const session = await serverPB.collection('sessions').getOne(sessionId);

    if (!session)
        return new Response(JSON.stringify({ message: 'Session not found' }), { status: 404 });

    // ========================================
    // Create the chat event for the player's input
    // ========================================

    const playerResponse = await Server.chat.createPlayerChat(message, state, sessionId, session);


    // ========================================
    // Create the chat event for the AI's response
    // ========================================
    // TODO: The generate function should be moved into a helper function
    // Generate the response from Deepseek
    // TODO: Make an official method for handling a chat response completion


    // Create the new state from the response
    // TODO: Write a completion method to generate the state

    const { agentResponse, agentChatEvent } = await Server.chat.createAgentChat(message, state, sessionId, session)

    // EXPECTED:
    // - Fetch the session
    // - Call Gen Player Chat Event
    // - Call Gen AI Chat Event
    // - Return success

    // Don't await this, we don't want to block the response
    const stateChat = await Server.chat.createStateChat(state, message, agentResponse, agentChatEvent)



    console.log('Returning success');
    return new Response(JSON.stringify({ success: true }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
