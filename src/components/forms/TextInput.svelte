<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { onMount, type Snippet } from 'svelte';

	let {
		value = $bindable(),
		valid = $bindable(),
		label,
		type = 'text',
		name = '',
		tooltip = null,
		validator = () => '',
		...restProps
	}: {
		value: string;
		valid: boolean;
		label: string | null;
		type?: string;
		name?: string;
		tooltip?: Snippet | null;
		validator: (value: string) => string;
	} = $props();

	let state = $state({
		error: '',
		hasBlurred: false,
		errorHeight: 0
	});

	let errorDiv: HTMLDivElement;
	let input: HTMLInputElement;

	const handleFocus = () => {
		state.hasBlurred = false;
		state.error = '';
		state.errorHeight = 0;
	};

	const handleBlur = () => {
		state.hasBlurred = true;
		validate();
	};

	const handleChange = () => {
		if (state.hasBlurred) validate();
	};

	const validate = () => {
		state.error = validator(value);
		valid = state.error === '';
		setTimeout(() => {
			state.errorHeight = state.error ? errorDiv?.clientHeight : 0;
		}, 1);
	};
</script>

<div class="card transition-all duration-150 {state.error ? 'bg-error' : ''}">
	<label>
		<div class="flex justify-between">
			<div class="font-bold">{label}</div>
			{tooltip}
		</div>
		<input
			bind:this={input}
			onfocus={handleFocus}
			onblur={handleBlur}
			oninput={handleChange}
			{type}
			{name}
			class="input transition-colors duration-150 {state.error
				? 'input-error'
				: valid
					? 'input-success'
					: ''}"
			{...restProps}
			bind:value
		/>
		<div class="overflow-hidden transition-all duration-150" style="height: {state.errorHeight}px;">
			<div bind:this={errorDiv}>
				{state.error}
			</div>
		</div>
	</label>
</div>
