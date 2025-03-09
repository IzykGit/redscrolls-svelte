<script lang="ts">
	import { page } from '$app/state';
	import Global from '$lib/classes/Global';
	import Redscrolls from '$lib/classes/Redscrolls';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { id } = page.params;

	const state = $state({
		ready: false,
		input: '',
		session: null as any
	});

	const handleMessage = () => {
		console.log('Sending message', state.input);
		fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: state.input,
				sessionId: id
			})
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('Response', res);
			});
	};

	const setSession = (session) => {
		let _session = Global.tools.traverseExpansions(session);
		state.session = _session;
	};

	const getHistory = () => {
		Redscrolls.pb
			.collection('session')
			.getOne(id, {
				expand: 'session,chat_history,quests,metadata,character.metadata,character.status'
			})
			.then((res) => {
				if (!res) {
					console.error('No session found');
					return;
				}
				setSession(res);
			});
	};

	onMount(() => {
		Redscrolls.pb.collection('session').subscribe('*', (e) => {
			console.group('Session Event');
			console.log(e.action);
			console.log(e.record);
			getHistory();
			console.groupEnd();
		});

		getHistory();
	});
</script>

<div class="mx-auto grid h-screen grid-rows-[auto_1fr_auto] p-4" style="max-width: 800px;">
	{#each state?.session?.quests.filter((q: any) => q.active) as quest}
		<div class="card bg-accent p-4">
			<div>{quest.name}</div>
		</div>
	{/each}
	<div>
		<div class="chat flex flex-col gap-4">
			{#each state?.session?.chat_history as chat}
				<div class="chat-bubble chat-bubble-info">{chat.response_text}</div>
			{/each}
		</div>
	</div>
	<div class="flex items-center gap-2">
		<input class="input w-full" bind:value={state.input} />
		<button onclick={handleMessage} class="btn btn-primary">
			<Icon icon="stash:paperplane-solid" />
		</button>
	</div>
</div>
