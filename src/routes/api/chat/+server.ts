import Redscrolls from "$lib/classes/Redscrolls";

export async function POST(event) {
    const body = await event.request.json()

    if (!body.message) return new Response(JSON.stringify({ message: "Did not find message" }), { status: 400 });

    const deepseekResponse = await Redscrolls.deepseek.testCompletion(body.message);


    return new Response(JSON.stringify(deepseekResponse), {
        headers: {
            "Content-Type": "application/json",
        }
    })
}