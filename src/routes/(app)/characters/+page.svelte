<script lang="ts">
	import Redscrolls from '$lib/classes/Redscrolls';
	import { onMount } from 'svelte';
	import VanillaTilt from 'vanilla-tilt';

	let state = $state({
		ready: false,
		characters: []
	});

	onMount(() => {
		const cards = document.querySelectorAll('.char-card').values().toArray() as HTMLElement[];
		if (!cards) return;
		VanillaTilt.init(cards, {
			max: 20,
			speed: 400,
			glare: true,
			'max-glare': 0.2
		});

		Redscrolls.pb.collection('characters').subscribe('*', (e) => {
			console.group('Character Event');
			console.log(e.action);
			console.log(e.record);
			console.groupEnd();
		});
		Redscrolls.pb
			.collection('characters')
			.getList()
			.then((res) => {
				console.group('Character List');
				console.log(res);
				console.groupEnd();
			});
	});
</script>

<div class="flex flex-col items-center p-4">
	<div class="relative grid w-full grid-cols-1 lg:grid-cols-3" style="max-width: 900px; ">
		<div class="py-4 brightness-200 transition-all duration-300 hover:scale-105">
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
						<div>Character Name</div>
					</div>

					<div class="p-4">Metadata</div>
					<div class="p-4">Metadata</div>
					<div class="p-4">Metadata</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
