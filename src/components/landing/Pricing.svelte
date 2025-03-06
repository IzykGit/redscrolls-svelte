<script lang="ts">
	import Icon from '@iconify/svelte';

	const items = [
		{
			name: 'Adventurer',
			icon: 'game-icons:hiking',
			price: 4,
			mostPopular: true,
			features: ['Feature 1', 'Feature 2', 'Feature 3']
		},
		{
			name: 'Hero',
			icon: 'game-icons:king',
			price: 9,
			mostPopular: false,
			features: ['Feature 1', 'Feature 2', 'Feature 3']
		},
		{
			name: 'Legend',
			icon: 'game-icons:fire-silhouette',
			price: 19,
			mostPopular: false,
			features: ['Feature 1', 'Feature 2', 'Feature 3']
		}
	];
</script>

{#snippet pricingCard({
	name,
	icon,
	mostPopular = false,
	features = []
}: {
	name: string;
	icon: string;
	mostPopular?: boolean;
	features?: string[];
})}
	<div class="card relative overflow-hidden py-px">
		<div
			class=" absolute inset-0 z-0"
			style="background: radial-gradient(circle, var(--color-warning), transparent); inset-0
			"
		></div>
		<div class="card bg-base-100 relative z-10 flex flex-col overflow-hidden">
			<div class="bg-primary grid w-full grid-cols-[auto_1fr_auto] gap-4 p-4">
				<Icon {icon} width={48} height={48} />
				<div class="flex flex-col">
					{#if mostPopular}
						<span class="badge badge-xs badge-warning">Most Popular</span>
					{/if}
					<h2 class="text-2xl font-bold">{name}</h2>
				</div>
				<div></div>
			</div>
			{#each features as feature}
				<div>{feature}</div>
			{/each}
		</div>
	</div>
{/snippet}

<div class="flex flex-col gap-4 p-4">
	<h2 class="text-2xl font-bold">Pricing</h2>
	<div class="grid grid-cols-3 gap-4">
		{#each items as item}
			{@render pricingCard(item)}
		{/each}
	</div>
	<div>Rates are subject to change.</div>
</div>
