<script lang="ts">
	import { slide } from 'svelte/transition';
	import PasswordTip from '$lib/tooltips/PasswordTip.svelte';
	import EmailValidator from '$lib/validators/EmailValidator';
	import PasswordValidator from '$lib/validators/PasswordValidator';
	import TextInput from '../../../components/forms/TextInput.svelte';
	import App from '$lib/App';
	import type { ClientResponseError } from 'pocketbase';
	import { preventDefault } from 'svelte/legacy';
	import AnimButton from '../../../components/buttons/AnimButton.svelte';
	let state = $state({
		loading: false,
		error: '',
		email: {
			value: '',
			valid: false
		},
		password: {
			value: '',
			valid: false
		},
		verify: {
			value: '',
			valid: false
		}
	});

	const formValid = $derived(
		state.email.valid && state.password.valid && state.password.value === state.verify.value
	);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		state.loading = true;
		console.log('submitting', state.email);
		const { value: email } = state.email;
		const { value: password } = state.password;
		const { value: verify } = state.verify;
		const user = await App.db
			.collection('users')
			.create({ email, password, passwordConfirm: verify })
			.catch((err: ClientResponseError) => {
				console.log('error', err.message);
				state.error = err.message;
			})
			.finally(() => {
				state.loading = false;
			});
		console.log('user', user);
	};
</script>

<div class="flex flex-col gap-4">
	{#if !state.loading}
		<form onsubmit={handleSubmit}>
			<div class="flex flex-col gap-4" transition:slide>
				<TextInput
					bind:value={state.email.value}
					bind:valid={state.email.valid}
					label="Email"
					type="email"
					validator={EmailValidator}
				/>
				<TextInput
					bind:value={state.password.value}
					bind:valid={state.password.valid}
					label="Password"
					type="password"
					validator={PasswordValidator}
				/>
				<TextInput
					bind:value={state.verify.value}
					bind:valid={state.verify.valid}
					label="Verify Password"
					type="password"
					validator={PasswordValidator}
				/>
				<hr />
				<AnimButton mainText="Log In" altText="Let's Go" />
				<div class="flex flex-col text-center">
					<div class="text-sm">Already have an account?</div>
					<a class="btn btn-link btn-secondary" href="/login">Log In Instead</a>
				</div>
				{#if state.error}
					<div class="card bg-error text-error-content flex flex-col p-2">
						<div class="font-bold">There Was An Error</div>
						<div>{state.error}</div>
					</div>
				{/if}
			</div>
		</form>
	{:else}
		<div class="flex flex-col gap-4" transition:slide>
			<div>Loggin in</div>
		</div>
	{/if}
</div>
