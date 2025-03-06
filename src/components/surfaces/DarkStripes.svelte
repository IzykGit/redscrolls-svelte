<script lang="ts">
	let { classes, children } = $props();
</script>

<div class="{classes} relative">
	<div class="diagonal-stripes absolute inset-0"></div>
	<div class="relative z-10">
		{@render children?.()}
	</div>
</div>
