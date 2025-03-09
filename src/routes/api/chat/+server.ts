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
        console.log('Creating chat event for player input');
        const playerChatEvent = await Redscrolls.pb.collection('chat_events').create();
        await Promise.all([
            // Create the message and state for the player's input
            Redscrolls.pb.collection('messages').create({
                message,
                author: 'player',
                chat_event: playerChatEvent.id
            }),
            // Create the state for the player's input
            Redscrolls.pb.collection('chat_states').create({
                state,
                chat_event: playerChatEvent.id
            })
        ]);

        // Update the session with the new chat entry.
        console.log('Updating session with player chat event');
        await Redscrolls.pb.collection('sessions').update(sessionId, {
            events: [...session.events, playerChatEvent.id]
        });
    }

    const generate = async () => {
        // ========================================
        // Create the chat event for the AI's response
        // ========================================
        // TODO: The generate function should be moved into a helper function
        // Generate the response from Deepseek
        // TODO: Make an official method for handling a chat response completion
        console.log('Generating response from Deepseek');
        const agentResponse = await Deepseek.testCompletion(message);
        console.log('Response from Deepseek', agentResponse);

        // Create entry and update the session with the new chat entry.
        console.log('Creating chat event for agent response');
        const agentChatEvent = await Redscrolls.pb.collection('chat_events').create();
        await Redscrolls.pb.collection('sessions').update(sessionId, {
            events: [...session.events, agentChatEvent.id]
        });

        // Create the message for the AI's response
        console.log('Creating message from response');
        await Redscrolls.pb.collection('messages').create({
            message: agentResponse,
            author: 'player',
            chat_event: agentChatEvent.id
        });

        // Create the new state from the response
        // TODO: Write a completion method to generate the state
        console.log('Creating state from response');
        const stateId = await Redscrolls.pb.collection('chat_states').create({
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

    console.log('Returning success');
    return new Response(JSON.stringify({ success: true }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
