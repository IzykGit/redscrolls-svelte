import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

class Redscrolls {
    instance: Redscrolls | null = null;

    static pb = new PocketBase(PUBLIC_POCKETBASE_URL);

    constructor() {
        if (this.instance) return this.instance;
        this.instance = this;
    }
}

export default Redscrolls;
