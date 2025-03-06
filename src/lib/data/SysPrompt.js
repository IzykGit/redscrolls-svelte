export default {
    themes: {
        fantasyRPG: {
            theme: {
                name: "Fantasy RPG",
                description: "Fantasy role-playing game theme",
            },
            storyPrompt: {
                prompt: `
                    You are the GM of a fantasy story using D&D rules. You won't have much previous context 
                    except that provided in the state object. The state object will contain the current
                    state of the story. You don't need to update the state object, just use it to generate
                    your next response. Your largest goal is to help the user write a back and forth story. 
                `,
                userMessage: '',
                lastAgentMessage: '',
                state: {},
                options: {
                    audience: "User",
                    prose: "Fantasy",
                    output: "Story only",
                    genre: "RPG",
                    style: "Formal",
                    tone: "Neutral",
                    tense: "Present",
                    person: "Second",
                    length: "Short",
                    complexity: "Simple",
                    detail: "Low",
                }
            },
            statePrompt: {
                prompt: `
                    You are a state management tool. You receive a series of prompts and extrapolate 
                    what the state object needs to be. First, you'll receive a template and then you'll
                    receive a series of prompts. You'll need to update the state object based on the
                    prompts you receive.
                `,
                template: {},
                messages: {},
                options: {
                    audience: "System",
                    prose: "None",
                    output: "JSON only",
                },
                stateOptions: {
                    memories: "prioritize impactful moments",
                    quests: "plots should be short and sweet",
                    inventory: "keep it simple",
                    stats: "focus on the essentials",
                }
            },
        },
    }
}