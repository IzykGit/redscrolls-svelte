<script lang="ts">
	import Icon from '@iconify/svelte';

	const items = [
		{
			name: 'Adventurer',
			icon: 'game-icons:hiking',
			price: 4,
			mostPopular: true,
			features: [
				{
					name: '100 Messages Per Month',
					has: true
				},
				{
					name: '1 Character',
					has: false
				},
				{
					name: 'Quests',
					has: false
				}
			]
		},
		{
			name: 'Hero',
			icon: 'game-icons:king',
			price: 9,
			mostPopular: false,
			features: [
				{
					name: '100 Messages Per Month',
					has: true
				},
				{
					name: '10 Characters',
					has: true
				},
				{
					name: 'Quests',
					has: true
				}
			]
		},
		{
			name: 'Legend',
			icon: 'game-icons:fire-silhouette',
			price: 19,
			mostPopular: false,
			features: [
				{
					name: '1,000 Messages Per Month',
					has: true
				},
				{
					name: 'Unlimited Characters',
					has: true
				},
				{
					name: 'Quests',
					has: true
				}
			]
		}
	];
</script>

{#snippet pricingCard({
	name,
	icon,
	mostPopular = false,
	price,
	features
}: {
	name: string;
	icon: string;
	mostPopular?: boolean;
	price: number;
	features: {
		name: string;
		has: boolean;
	}[];
})}
	<div class="card relative overflow-hidden py-px">
		<div
			class=" absolute inset-0 z-0"
			style="background: radial-gradient(circle, var(--color-warning), transparent); inset-0
			"
		></div>
		<div class="card bg-base-100 relative z-10 flex flex-col overflow-hidden">
			<div class="bg-primary grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-[auto_1fr_auto]">
				<Icon {icon} width={48} height={48} />
				<div class="flex flex-col">
					{#if mostPopular}
						<span class="badge badge-xs badge-warning">Most Popular</span>
					{/if}
					<h2 class="text-2xl font-bold">{name}</h2>
				</div>
				<div class="flex items-start text-sm">
					<div>$</div>
					<div class="-mt-1 text-4xl font-bold">{price}</div>
					<div>/mo</div>
				</div>
			</div>
			<div class="grid grid-cols-[auto_auto_1fr] items-center gap-2 p-4">
				{#each features as feature}
					<div>
						<div class="bg-primary h-1 w-1 rounded-full"></div>
					</div>
					{#if feature.has}
						<div class="bg-success text-success-content flex h-6 w-6 rounded-sm">
							<Icon icon="bx:bx-check" width={24} height={24} />
						</div>
					{:else}
						<div
							class="bg-error text-error-content flex h-6 w-6 items-center justify-center rounded-sm"
						>
							<Icon icon="bx:bx-x" width={24} height={24} />
						</div>
					{/if}
					<div>{feature.name}</div>
				{/each}
			</div>
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
