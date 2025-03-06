<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import App from '$lib/App';
	import { goto } from '$app/navigation';
	import Minibar from '../components/navigation/Minibar.svelte';
	import Herobar from '../components/navigation/Herobar.svelte';
	let { children } = $props();

	onMount(() => {
		console.log(App.db.authStore);
		if (!App.user.isAuthed()) {
			goto('/login');
		}
	});
</script>

{#if false && App.user.isAuthed()}
	<div class="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
		<Minibar />
		<div class="min-h-screen">
			{@render children()}
		</div>
	</div>
{:else}
	<div class="flex flex-col">
		<Herobar />
		{@render children()}
	</div>
{/if}
