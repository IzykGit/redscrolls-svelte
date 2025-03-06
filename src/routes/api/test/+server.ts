import GameSession from "$lib/classes/GameSession";


export async function GET() {
    const response = await GameSession.getFullSession("865j97c668vsi1y")

    return new Response(response)
} 