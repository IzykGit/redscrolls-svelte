<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../../components/Card.svelte';
	import DarkStripes from '../../components/surfaces/DarkStripes.svelte';
	import App from '$lib/App';
	import { goto } from '$app/navigation';

	const { children } = $props();

	onMount(() => {
		if (App.user.isAuthed()) {
			console.log('user is authed', App.db.authStore.record);
			goto('/');
		}
	});
</script>

<div class=" flex h-full items-center justify-center">
	<DarkStripes classes="h-full w-full flex items-center justify-center">
		<Card>
			{@render children()}
		</Card>
	</DarkStripes>
</div>
