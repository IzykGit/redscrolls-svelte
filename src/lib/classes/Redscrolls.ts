import { PRIVATE_DEEPSEEK_API_URL, PRIVATE_DEEPSEEK_API_KEY } from "$env/static/private";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase"
import type { IChat } from "$lib/@types/ChatInterface";

class Redscrolls {
    instance: Redscrolls | null = null

    static pb = new PocketBase(PUBLIC_POCKETBASE_URL)

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this;
    }


    static deepseek = {

        model: "deepseek-chat",
        url: PRIVATE_DEEPSEEK_API_URL || "https://api.deepseek.com",
        token: PRIVATE_DEEPSEEK_API_KEY,

        async chatFactory({ userMessage, lastMessage, stateMessage }: IChat) {
            return [
                // the prompt that explains how it uses the state, also provides the state, will have a second condensed version
                { role: "system", content: stateMessage },
                // the users message
                { role: "user", content: userMessage },
                // last thing assistant said
                { role: "assistant", content: lastMessage }
            ];
        },

        async testCompletion({ message }: any) {
            const baseUrl = Redscrolls.deepseek.url;

            const body = {
                model: Redscrolls.deepseek.model,
                messages: [{ role: "user", content: message }]
            }

            const response = await fetch(baseUrl + "/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Redscrolls.deepseek.token
                },
                body: JSON.stringify(body)
            }).then(res => res.json());
            console.log("Response", response);
            return response?.choices?.find((choice: any) => choice.index === 0)?.message?.content || "No response";
        },
    }
}

export default Redscrolls