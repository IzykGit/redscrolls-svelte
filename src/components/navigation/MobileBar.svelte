<script>
	import Icon from '@iconify/svelte';

	const { toggleMobile } = $props();
</script>

<div class="bg-base-100 grid grid-cols-[auto_1fr] items-center">
	<button class="btn btn-ghost" onclick={toggleMobile}>
		<Icon icon="carbon:menu" width="32" height="32" />
	</button>
	<div>Redscrolls</div>
</div>
