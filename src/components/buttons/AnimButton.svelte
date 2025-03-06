<script lang="ts">
	let { children = null, classes = '', mainText = '', altText = '' } = $props();
</script>

<button
	class="btn anim-btn btn-primary hover:btn-accent relative flex items-center justify-center overflow-hidden transition-all duration-75 hover:delay-75"
>
	<div class="anim-label main-label relative z-10">{mainText}</div>
	<div class="anim-label alt-label absolute z-10">{altText}</div>
	<div class=" anim-alt bg-accent absolute transition-all duration-300"></div>
</button>

<style lang="css">
	.anim-alt {
		translate: -100% 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.anim-label {
	}

	.alt-label {
		translate: 0 100%;
		transition: all 222ms;
		opacity: 0;
	}

	.main-label {
		translate: 0 0;
		transition: all 222ms;
		opacity: 1;
	}

	.anim-btn:hover .anim-alt,
	.anim-btn:focus .anim-alt {
		translate: 0 0;
	}

	.anim-btn:hover .alt-label,
	.anim-btn:focus .alt-label {
		translate: 0 0;
		opacity: 1;
	}

	.anim-btn:hover .main-label,
	.anim-btn:focus .main-label {
		translate: 0 -100%;
		opacity: 0;
	}
</style>
