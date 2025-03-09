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
		action: 'story',
		session: null as any,
		events: [] as any
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
				sessionId: id,
				state: {}
			})
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('Response', res);
			});
	};

	const setSession = (session: any) => {
		let _session = Global.tools.traverseExpansions(session);
		console.log('Session', _session);
		state.session = _session;
	};

	const getSession = () => {
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
				setSession(res);
			});
	};

	onMount(() => {
		Redscrolls.pb.collection('sessions').subscribe('*', (e) => {
			getSession();
		});

		Redscrolls.pb.collection('messages').subscribe('*', (e) => {
			console.group('Message Event');
			console.log();
			console.groupEnd();
		});

		Redscrolls.pb.collection('chat_events').subscribe('*', (e) => {
			console.group('Chat Event');
			console.log();
			console.groupEnd();
		});

		getSession();
	});
</script>

<div class="mx-auto grid h-full grid-rows-[auto_1fr_auto] p-4" style="max-width: 800px;">
	{#each state?.session?.quests.filter((q: any) => q.active) as quest}
		<div class="ui-quest-frame grid grid-cols-[auto_1fr] items-center justify-center gap-2 p-4">
			<img src="/ui/option_button.png" class=" h-8 w-8" />
			<div>{quest.name}</div>
		</div>
	{/each}
	<div class="h-full overflow-x-hidden overflow-y-scroll">
		<div class="chat flex flex-col gap-4">
			{#each state?.session?.chat_history as chat}
				<div class="chat-bubble chat-bubble-info">{chat.response_text}</div>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-[1fr_auto] items-end gap-2">
		<div class="ui-midbutton-frame relative">
			<div class="ui-skillbar-frame absolute inset-0"></div>
			<textarea
				rows="1"
				class="relative z-10 max-h-32 min-h-10 w-full border-transparent bg-transparent"
				bind:value={state.input}
			></textarea>
		</div>
		<button
			onclick={handleMessage}
			class="ui-mini-button flex h-12 w-12 items-center justify-center transition-all duration-100 active:scale-95"
		>
			<Icon icon="stash:paperplane-solid" width={32} height={32} />
		</button>
	</div>
</div>
