<script lang="ts">
	import { goto } from '$app/navigation';
	import Global from '$lib/classes/Global';
	import Redscrolls from '$lib/classes/Redscrolls';
	import Themer from '$lib/classes/Themer';
	import { onMount } from 'svelte';
	import VanillaTilt from 'vanilla-tilt';

	let state = $state({
		ready: false,
		sessions: [] as any
	});

	$effect(() => {
		if (!state.ready) return;
		const cards = document.querySelectorAll('.char-card').values().toArray() as HTMLElement[];
		if (!cards) return;

		VanillaTilt.init(cards, {
			max: 10,
			speed: 400,
			glare: true,
			'max-glare': 0.2
		});
	});

	onMount(() => {
		Redscrolls.pb
			.collection('sessions')
			.getFullList({ expand: 'session,quests,metadata,character.metadata,character.status' })
			.then((res) => {
				let sessions = res.map((session) => {
					let _session = Global.tools.traverseExpansions(session);
					_session = Themer.tools.enforceTheme({
						session: _session,
						theme: 'rpg'
					});

					console.log('Session', _session);

					return _session;
				});
				state.sessions = sessions;
				state.ready = true;
				console.log(state.sessions);
			});

		Redscrolls.pb.collection('session').subscribe('*', (e) => {
			console.group('Character Event');
			console.log(e.action);
			console.log(e.record);
			console.groupEnd();
		});
	});
</script>

<div class="flex flex-col items-center p-4">
	<div class="relative grid w-full grid-cols-1 gap-4 lg:grid-cols-3" style="max-width: 900px; ">
		{#if state.ready}
			{#each state.sessions as session}
				<button
					onclick={() => goto('/session/' + session.id)}
					class="scale-95 py-4 transition-all duration-300 hover:z-10 hover:scale-105"
				>
					<div class="char-card ui-info-window bg-base-100 grid w-full grid-rows-[auto_1fr]">
						<div class="ui-mid-bar-frame absolute inset-0 z-10"></div>
						<div class="relative z-0 overflow-hidden rounded-t-md p-1">
							<img
								src="https://i.imgur.com/Z2Ryv2Wg.jpg"
								alt="Character Image"
								class="h-48 w-full object-cover"
							/>
						</div>
						<div class=" relative z-10 flex flex-col">
							<div class="ui-name-plate archivo relative z-20 -m-6 -mb-2">
								<div>{session.character.name}</div>
							</div>
							{#each session.metadata as meta}
								<div class="flex justify-between px-2">
									<div class="p-4">{meta.key}</div>
									<div class="p-4">{meta.value}</div>
								</div>
							{/each}
						</div>
					</div>
				</button>
			{/each}
		{/if}
	</div>
</div>

<style>
</style>
