<script lang="ts">
	import { page } from '$app/state';
	import Global from '$lib/classes/Global';
	import Redscrolls from '$lib/classes/Redscrolls';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { id } = page.params;

	const _exmessages = [
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
		session: null as any
	});

	const latestActivePlot = $derived(() => {
		// Can't use structuredClone because window isn't defined the first call
		const quests = state.session.quests ? JSON.parse(JSON.stringify(state.session.quests)) : [];
		// Get the latest active quest
		const quest = quests.filter((q: any) => q.active).pop();
		if (!quest) return null;

		// Get the latest active plot
		const plot = quest.plots.pop();
		if (!plot) return null;
		return plot;
	});

	const events = $derived(state.session?.events || []);

	const chatEvents = $derived(state.session?.events?.filter((e) => e.message));

	const latestEvent = $derived(() => {
		return events[events.length - 1] || null;
	});

	const latestAgentMessage = $derived(() => {
		const _message = events.filter((e) => e.message.author === 'agent');
		return _message[_message.length - 1] || null;
	});

	const latestState = $derived(() => {
		return events[events.length - 1]?.state.state || {};
	});

	const generating = $derived(() => {
		const event = latestEvent();
		if (!event) return false;
		return !event.message || !event.state;
	});

	const handleSendMessage = () => {
		console.log('Sending message', state.input);
		fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userMessage: state.input,
				agentMessage: latestAgentMessage() || 'Initiating message',
				sessionId: id,
				state: latestState()
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

	const refresh = () => {
		console.log('Refreshing');
		Redscrolls.pb
			.collection('sessions')
			.getOne(id, {
				expand:
					'sessions,events,events.message,events.state,quests,quests.plots,metadata,characters,characters.metadata,characters.statuses'
			})
			.then((res) => setSession(res));
	};

	onMount(async () => {
		// Set up subscriptions
		Redscrolls.pb.collection('sessions').subscribe('*', refresh);
		Redscrolls.pb.collection('chat_events').subscribe('*', refresh);

		// Get initial data
		refresh();
	});
</script>

<div class="mx-auto grid h-full grid-rows-[auto_1fr_auto] p-4" style="max-width: 800px;">
	{#each state?.session?.quests.filter((q: any) => q.active) as quest}
		<div
			class="ui-quest-frame z-10 grid grid-cols-[auto_1fr_auto] items-center justify-center gap-2 p-4"
		>
			<img src="/ui/option_button.png" class=" h-8 w-8" />
			<div>{quest.name}</div>
			<div>
				<Icon icon="heroicons-solid:star" width={24} height={24} />
			</div>
			<div class="col-span-3 grid grid-cols-[auto_1fr] items-center gap-2 pl-8">
				{#if latestActivePlot()}
					<img
						src="/ui/option_button.png"
						class=" h-8 w-8"
						style="filter:hue-rotate(70deg) brightness(1.5);"
					/>
					<div>{latestActivePlot().name}</div>
				{/if}
			</div>
		</div>
	{/each}
	<div class="relative h-full">
		<div class="absolute inset-0 -top-8 right-2 -bottom-8 left-2"></div>
		<div class="absolute inset-0 flex flex-col gap-4 overflow-x-hidden overflow-y-scroll p-8">
			{#if chatEvents?.length == 0}
				<div class="p-4 text-center">No chat history</div>
			{/if}
			{#each chatEvents as event}
				<div
					class=" relative flex flex-col px-5 py-3 text-justify {event.message.author === 'agent'
						? ' self-start bg-red-300'
						: ' items-end self-end bg-cyan-300'} max-w-4/5 min-w-2/3"
				>
					<div class="ui-chat-frame absolute inset-0 z-10"></div>
					<div class="ui-chat-bar absolute inset-0 z-0 mix-blend-luminosity"></div>
					<div
						class="relative z-20 flex flex-col {event.message.author === 'agent'
							? 'items-start'
							: 'items-end'}"
					>
						<div class="absolute -top-10 -mx-4 flex capitalize">
							<div class=" ui-chat-author p-2 px-8 font-bold">{event.message.author}</div>
						</div>
						<div class=" whitespace-pre-line">
							{event.message.message}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="relative z-20 h-12 w-full">
		<div
			class="absolute inset-0 z-10 flex items-center justify-center bg-cyan-800
				transition-all duration-150
			{generating() ? 'translate-y-12' : ''}"
		>
			{#if generating()}
				<div class="">Generating Message</div>
			{:else}
				<div class="">Ready</div>
			{/if}
		</div>
	</div>
	<div class="relative z-10 grid grid-cols-[1fr_auto] items-end gap-2">
		<div class="ui-midbutton-frame relative">
			<div class="ui-skillbar-frame absolute inset-0"></div>
			<textarea
				disabled={generating()}
				rows="1"
				class="relative z-10 max-h-32 min-h-10 w-full border-transparent bg-transparent"
				bind:value={state.input}
			></textarea>
		</div>
		<button
			onclick={handleSendMessage}
			disabled={generating()}
			class="ui-mini-button flex h-12 w-12 items-center justify-center transition-all duration-100 active:scale-95"
		>
			<Icon icon="stash:paperplane-solid" width={32} height={32} />
		</button>
	</div>
</div>
