<script>
	import DarkStripes from '../surfaces/DarkStripes.svelte';
	import AppPreview from './AppPreview.svelte';
	import CallToAction from './CallToAction.svelte';
	import Features from './Features.svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero.svelte';
	import Pricing from './Pricing.svelte';
	import Themes from './Themes.svelte';
</script>

<div class="flex flex-col">
	<!-- Hero Section -->
	<Hero />
	<DarkStripes>
		<div class="flex flex-col items-center justify-center gap-4 p-4">
			<!-- Content -->
			<div
				class="z-50 -mt-4 flex w-full flex-col gap-4 rounded-md bg-slate-800 p-4"
				style="max-width: 1000px;"
			>
				<AppPreview />
				<Features />
				<Pricing />
				<Themes />
			</div>
			<div class="flex w-full" style="max-width: 1000px;">
				<CallToAction />
			</div>
		</div>
		<div class="my-4"></div>
	</DarkStripes>

	<!-- Footer-->
	<Footer />
</div>
