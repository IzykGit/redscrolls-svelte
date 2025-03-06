<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	let state = $state({
		user: null,
		isAuthed: false,
		locked: false
	});

	let container: HTMLDivElement;

	let items = $derived([
		[
			{
				icon: state.locked ? 'flowbite:close-sidebar-alt-solid' : 'flowbite:open-sidebar-alt-solid',
				name: 'Toggle Sidebar',

				action: () => (state.locked = !state.locked)
			},
			{ icon: 'bx:bx-home', name: 'Home', action: () => goto('/') },
			{ icon: 'bx:bx-user', name: 'Profile', action: () => goto('/profile') },
			{ icon: 'bx:bx-message', name: 'Messages', action: () => goto('/messages') },
			{ icon: 'bx:bx-book', name: 'Library', action: () => goto('/library') }
		],
		[
			{ icon: 'bx:bx-cog', name: 'Settings', href: '/settings', type: 'link' },
			{ icon: 'ri:user-5-fill', name: 'Username', action: () => console.log('Username') }
		]
	]);
</script>

<div
	bind:this={container}
	class="border-r-base-100 bg-base-200 hidden h-full border-r transition-all duration-150 lg:block {state.locked
		? ' overflow-hidden '
		: ''}"
	style="width: {!state.locked ? '64' : '220'}px"
	role="navigation"
>
	<div class="grid h-full grid-rows-[1fr_auto]">
		{#each items as item}
			<div>
				{#each item as { name, icon, action }, index}
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
