import { PRIVATE_SERVICE_EMAIL, PRIVATE_SERVICE_PASSWORD } from '$env/static/private';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { Handle, ServerInit } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export let serverPB: PocketBase;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};

export const init: ServerInit = async () => {
	serverPB = new PocketBase(PUBLIC_POCKETBASE_URL);
	await serverPB
		.collection('users')
		.authWithPassword(PRIVATE_SERVICE_EMAIL, PRIVATE_SERVICE_PASSWORD);
	console.log(serverPB.authStore.record);
};
