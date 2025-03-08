<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import NavUserTip from '$lib/tooltips/NavUserTip.svelte';

	const {
		isMobile = false,
		navigate
	}: {
		isMobile?: boolean;
		navigate: (url?: string) => void;
	} = $props();

	let state = $state({
		user: null,
		isAuthed: false,
		locked: isMobile
	});

	let container: HTMLDivElement;

	let items = $derived([
		[
			{
				icon: 'flowbite:close-sidebar-alt-solid',
				name: 'Close Sidebar',
				visible: isMobile,
				tooltip: null,
				action: () => navigate()
			},
			{
				icon: state.locked ? 'flowbite:close-sidebar-alt-solid' : 'flowbite:open-sidebar-alt-solid',
				name: 'Toggle Sidebar',
				visible: !isMobile,
				tooltip: null,
				action: () => (state.locked = !state.locked)
			},
			{
				icon: 'bx:bx-home',
				name: 'Home',
				action: () => navigate('/'),
				tooltip: null,
				visible: true
			},

			{
				icon: 'game-icons:meeple-king',
				name: 'Characters',
				action: () => navigate('/characters'),
				tooltip: null,
				visible: true
			}
		],
		[
			{
				icon: 'bx:bx-cog',
				name: 'Settings',
				action: () => navigate('/settings'),
				tooltip: null,
				visible: true
			},
			{
				icon: 'ri:user-5-fill',
				name: 'Username',
				action: () => console.log('Username'),
				tooltip: NavUserTip,
				visible: true
			}
		]
	]);
</script>

<div
	bind:this={container}
	class="border-r-base-100 bg-base-200 h-full border-r transition-all duration-150 {state.locked
		? ' overflow-hidden '
		: ''}"
	style="width: {!state.locked ? '64' : '220'}px"
	role="navigation"
>
	<div class="grid h-full grid-rows-[1fr_auto]">
		{#each items as item}
			<div>
				{#each item.filter((i) => i.visible) as { name, icon, tooltip, action }, index}
					<div data-tip={name} class="tooltip-right {!state.locked ? 'tooltip' : ''} ">
						<button
							onclick={action}
							class="hover:text-primary relative grid w-full grid-cols-[48px_1fr] items-center justify-start gap-4 text-left transition-colors"
							style="height: 64px;"
						>
							<div class="flex items-center justify-center" style="width: 64px">
								<Icon {icon} class="" width={24} height={24} />
							</div>
							{#if state.locked}
								<div
									class=" text-left whitespace-pre"
									transition:fly={{
										x: 40,
										duration: 222,
										delay: index * (!state.locked ? 0 : 77)
									}}
								>
									{name}
								</div>
							{/if}
						</button>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
