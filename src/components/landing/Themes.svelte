<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	let state = $state({
		active: 'fantasy'
	});

	let items = [
		{
			id: 'fantasy',
			icon: 'game-icons:burning-book',
			image: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
			title: 'Fantasy',
			subtitle: 'D&D Inspired',
			example: [
				{
					author: 'agent',
					text: `
						As you enter the ancient cavern, the air grows colder. The flickering torchlight reveals intricate 
						carvings on the walls, telling tales of forgotten heroes.
					`
				},
				{
					author: 'user',
					text: `I step forward, cautiously, curiously. "What do you think these carvings mean?"`
				},
				{
					author: 'user-agent',
					text: `
						I cautiously step forward, my hand resting on the hilt of my sword. 
						"What do you think these carvings mean?" I ask, glancing back at my companions.
					`
				},
				{
					author: 'agent',
					text: `
						One of your companions, the scholar, steps closer to examine the carvings. 
						"These depict the legend of the Dragon's Heart," he says, his voice echoing softly.
					`
				},
				{
					author: 'user-agent',
					text: `
						I nod and proceed with caution.
					`
				},
				{
					author: 'user',
					text: `
						I nod, my curiosity piqued. "We must be close then," I say, determination in my voice. "Let's proceed with caution."
					`
				}
			]
		},
		{
			id: 'detective',
			icon: 'material-symbols:mystery',
			image: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
			title: 'Detective',
			subtitle: 'Dark & Noir',
			example: []
		},
		{
			id: 'romance',
			icon: 'game-icons:crowned-heart',
			image: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
			title: 'Romance',
			subtitle: 'Love Stories',
			example: []
		}
	];

	let activeItem = $derived(items.find((item) => item.id === state.active));

	let getName = (type: string) => {
		switch (type) {
			case 'user-agent':
				return 'Player';
			case 'user':
				return 'You';
			case 'agent':
				return 'Narrator';
			default:
				return 'Unknown';
		}
	};
</script>

<div class="flex flex-col gap-4 p-4">
	<h2 class=" text-2xl font-bold">Do It All</h2>
	<div class="grid grid-cols-5 gap-4">
		<ul class="list bg-base-100 rounded-box col-span-2 shadow-md">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Explore Themes</li>
			{#each items as item}
				<li class="list-row">
					<div class="text-4xl font-thin tabular-nums opacity-50">
						<Icon icon={item.icon} />
					</div>
					<div>
						<img class="rounded-box size-10" alt="img" src={item.image} />
					</div>
					<div class="list-col-grow">
						<div>{item.title}</div>
						<div class="text-xs font-semibold uppercase opacity-60">
							{item.subtitle}
						</div>
					</div>
					<button
						onclick={() => (state.active = item.id)}
						class="btn btn-square transition-all duration-100 {state.active === item.id
							? 'btn-primary translate-x-0 scale-110'
							: 'btn-ghost -translate-x-2'}"
					>
						<Icon icon="material-symbols:play-arrow-outline-rounded" width={48} height={48} />
					</button>
				</li>
			{/each}
		</ul>
		<div class="card bg-base-300 col-span-3 flex flex-col p-4">
			<div class="flex h-96 flex-col gap-4 overflow-x-hidden">
				{#each activeItem?.example as { author, text }, index}
					<div
						class="card bg-base-100 flex flex-col gap-2 p-2 {author === 'agent'
							? 'bg-warning/20 mr-4'
							: 'bg-info/20 ml-4'}"
						in:fly={{ x: author === 'agent' ? -100 : 100, duration: 200, delay: index * 100 }}
					>
						<div class="text-xs font-semibold opacity-60">{getName(author)}</div>
						<div>{text}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
