import { serverPB } from '../../hooks.server';

export const GET = async () => {
	console.log('ME', serverPB.authStore.record);
};
