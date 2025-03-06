<script>
	import { onMount } from 'svelte';
	import LandingMain from '../components/landing/LandingMain.svelte';
	import App from '$lib/App';

	const isAuthed = $derived(App.user.isAuthed);
</script>

<div class="">
	{#if isAuthed()}
		<p>Authed</p>
	{:else}
		<LandingMain />
	{/if}
</div>
