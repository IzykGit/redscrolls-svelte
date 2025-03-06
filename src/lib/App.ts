import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

class App {
	static db = new PocketBase(PUBLIC_POCKETBASE_URL);

	static user = {
		isAuthed() {
			return App.db.authStore.isValid;
		}
	};
}

export default App;
