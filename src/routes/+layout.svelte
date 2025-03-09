<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import App from '$lib/App';
	import { goto } from '$app/navigation';
	import Minibar from '../components/navigation/Minibar.svelte';
	import Herobar from '../components/navigation/Herobar.svelte';
	import MobileBar from '../components/navigation/MobileBar.svelte';
	let { children } = $props();

	let state = $state({
		sidebarOpen: false
	});

	const navigate = ({ url = '', closeSidebar = false }) => {
		if (closeSidebar) {
			state.sidebarOpen = false;
		}
		if (url) {
			goto(url);
		}
	};

	onMount(() => {
		console.log(App.db.authStore);
		if (!App.user.isAuthed()) {
			goto('/login');
		}
	});
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button
	onclick={(e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		state.sidebarOpen = false;
	}}
	class="absolute inset-0 transition-all duration-75 {state.sidebarOpen
		? 'pointer-events-auto bg-black/50'
		: 'pointer-events-none bg-black/0'}"
	style="z-index: 998;"
></button>
<div
	class="bg-base-100 absolute inset-y-0 left-0 transition-all duration-75 {state.sidebarOpen
		? 'translate-x-0'
		: '-translate-x-full'}"
	style="z-index: 999;"
>
	<Minibar
		isMobile
		navigate={(url?: string) =>
			navigate({
				url,
				closeSidebar: true
			})}
	/>
</div>

{#if App.user.isAuthed()}
	<div
		class="grid h-screen grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr] lg:grid-rows-1"
	>
		<div class="hidden lg:contents">
			<Minibar
				navigate={(url?: string) => {
					navigate({
						url,
						closeSidebar: false
					});
				}}
			/>
		</div>
		<div class="contents lg:hidden">
			<MobileBar toggleMobile={() => (state.sidebarOpen = !state.sidebarOpen)} />
		</div>
		<div class="h-full overflow-auto">
			{@render children()}
		</div>
	</div>
{:else}
	<div class="flex flex-col">
		<Herobar />
		{@render children()}
	</div>
{/if}
