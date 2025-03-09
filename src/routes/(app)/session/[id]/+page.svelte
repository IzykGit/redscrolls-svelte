<script lang="ts">
	import { page } from '$app/state';
	import Global from '$lib/classes/Global';
	import Redscrolls from '$lib/classes/Redscrolls';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { id } = page.params;

	const messages = [
		{
			id: '1',
			session: '1',
			message: 'Hello, I am a bot. How can I help you today?',
			author: 'agent' as 'agent' | 'player' | 'character',
			action: 'attack' as 'story' | 'choice' | 'initiative' | 'attack' | 'skill-check',
			// Internal metadata information
			messageId: '1', // UUID of Deepseek message for reference
			inputTokens: 0,
			outputTokens: 0,
			cacheHitTokens: 0,
			cacheMissTokens: 0
		}
	];

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
			.collection('sessions')
			.getOne(id, {
				expand: 'sessions,events,quests,metadata,characters,characters.metadata,characters.statuses'
			})
			.then((res) => {
				if (!res) {
					console.error('No session found');
					return;
				}
				console.log('Session', res);
				setSession(res);
			});
	};

	onMount(() => {
		Redscrolls.pb.collection('sessions').subscribe('*', (e) => {
			getHistory();
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
