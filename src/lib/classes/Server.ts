import type { RecordModel } from "pocketbase";
import { serverPB } from "../../hooks.server";
import Deepseek from "./Deepseek";

import SysPrompt from "$lib/data/SysPrompt";

// the chat event is one giant message, as array

// chat event has two parts, one message, and the other is the chat state

// the state and the message are generated async

// the message comes through first

// the state updates in the background

// the user sends, loads, agent is formulating message, attach message to chat event, the backend sends message to the frontend, the frontend loads,
// the agent uses the deepseek response to create 

class Server {
    instance: Server | null = null

    cosntructor() {
        if (this.instance) return this.instance;
        this.instance = this as any;
    }

    static chat = {

        async createPlayerChat(message: string, state: any, sessionId: string, session: RecordModel) {
            // creating a player chat event and waiting for the response
            console.log('Creating chat event for player input');
            const playerChatEvent = await serverPB.collection('chat_events').create();
            await Promise.all([
                // Create the message and state for the player's input
                serverPB.collection('messages').create({
                    message,
                    author: 'player',
                    chat_event: playerChatEvent.id
                }),
                // Create the state for the player's input
                serverPB.collection('chat_states').create({
                    state,
                    chat_event: playerChatEvent.id
                })
            ]);

            // Update the session with the new chat entry.
            console.log('Updating session with player chat event');
            await serverPB.collection('sessions').update(sessionId, {
                events: [...session.events, playerChatEvent.id]
            });

            return playerChatEvent
        },


        async createAgentChat(message: string, state: any, sessionId: string, session: any) {
            // attaching deepseek response to the chat event
            console.log('Generating response from Deepseek');

            // construct story prompt
            let storyPrompt = SysPrompt.themes.fantasyRPG.storyPrompt;
            storyPrompt.messages.push(message)
            storyPrompt.state = state
            console.log(storyPrompt)

            const agentResponse = await Deepseek.completion(JSON.stringify(storyPrompt));
            console.log('Response from Deepseek', agentResponse);

            // Create entry and update the session with the new chat entry.
            console.log('Creating chat event for agent response');
            const agentChatEvent = await serverPB.collection('chat_events').create();
            await serverPB.collection('sessions').update(sessionId, {
                events: [...session.events, agentChatEvent.id]
            });

            // Create the message for the AI's response
            console.log('Creating message from response');
            await serverPB.collection('messages').create({
                message: agentResponse.message,
                message_id: agentResponse.message_id,
                author: 'deepseek',
                chat_event: agentChatEvent.id
                // TODO Add usage statistics from the rest of agentResponse
            });


            return { agentResponse, agentChatEvent }
        },


        async createStateChat(state: any, message: string, agentResponse: any, agentChatEvent: any) {
            // wait for state response to attach to chat event
            console.log('Creating state from response');

            let statePrompt = SysPrompt.themes.fantasyRPG.statePrompt;
            statePrompt.messages = [message, agentResponse];
            statePrompt.state = state;
            // statePrompt.template = template;
            console.log(statePrompt)

            const stateResponse = await Deepseek.completion(JSON.stringify(statePrompt));
            console.log(stateResponse)

            // TODO find first left bracket and last right bracket
            // Parse everything in between json! Use a try parse
            // What I am saving to the chat state is not the parsed json, it is what's left of the string
            // substring find the first left bracket
            // substring again to the find the first right bracket

            const agentMessage = stateResponse.message;
            const trimmed = agentMessage.substring(agentMessage.indexOf("{"), agentMessage.lastIndexOf("}") + 1)

            try {
                JSON.parse(trimmed);
            }
            catch (e) {
                console.error(e);
                throw new Error('Invalid JSON');
            }


            const stateId = await serverPB.collection('chat_states').create({
                state: trimmed,
                chat_event: agentChatEvent.id,
            });

            // Update the agentChatEvent with the new state
            await serverPB.collection('chat_events').update(agentChatEvent.id, {
                state: stateId
            });
        }
    }
}

export default Server;