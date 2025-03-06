import Global from "./Global";
import Redscrolls from "./Redscrolls";

class GameSession {
    instance: GameSession | null = null;

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this;
    }

    static async getFullSession(id: string) {
        // const char = await PocketBase.db.send("full_character/" + id);

        const expansionFields = Global.tools.concatExpansionFields([
            // Session
            "quests",
            "quests.plots",
            "quests.plots.tags",
            "chat_history",

            // Character
            "character",
            "character.status",
            "character.metadata",

            // Moments
            "character.moments",
            "character.moments.tags",

            // Inventory
            "character.inventory",
            "character.inventory.metadata",

            // Items
            "character.inventory.items",
            "character.inventory.items.tags",
        ])

        const char = await Redscrolls.pb.collection("session").getOne(id, {
            expand: expansionFields
        })



        let res = Global.tools.traverseExpansions(char);
        res = Global.tools.cullFields(res, ["created", "updated", "collectionId", "collectionName"]);
        console.log(res);
        // res = Global.tools.objectMinifier(res);
        // delete res.expand;

        return res;
    }
}

export default GameSession;