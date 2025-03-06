<script lang="ts">
	const { children } = $props();
</script>

<div class="card bg-base-200 p-8">
	{@render children()}
</div>
