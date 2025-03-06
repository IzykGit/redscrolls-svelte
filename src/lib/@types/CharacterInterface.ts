import { IMeta } from "./MetaInterface";
import IStatus from "./StatusInterface";


export interface ICharacter {
    id?: string;
    character_name: string;
    race: string;
    character_class: string;
    backstory: string;
    metadata: IMeta[];
    status: IStatus[];
}