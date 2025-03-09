import Deepseek from "$lib/classes/Deepseek.js";
import Redscrolls from "$lib/classes/Redscrolls.js";

export async function POST(event) {
    const body = await event.request.json()

    if (!body.message) return new Response(JSON.stringify({ message: "Did not find message" }), { status: 400 });

    const deepseekResponse = await Deepseek.testCompletion(body.message);

    // when message is sent create a chat event id
    // use realtime to generate chat_event and state_event at the same time?

    const chatEvent = await Redscrolls.pb.collection("chat_event").create();

    const responseData = {
        request: "POST",
        input_text: body,
        response_text: deepseekResponse,
        model: "deepseek",
        chat_event: chatEvent.id,
    }



    await Redscrolls.pb.collection("responses").create(responseData)



    return new Response(JSON.stringify(deepseekResponse), {
        headers: {
            "Content-Type": "application/json",
        }
    })
}