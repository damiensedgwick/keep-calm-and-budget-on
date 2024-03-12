<script lang="ts">
	import { goto } from '$app/navigation';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword as googleSignInWithEmailAndPassword,
		createUserWithEmailAndPassword,
	} from 'firebase/auth';

	let email: string;
	let password: string;
	let createAccount: boolean = false;
	let error: unknown;

	async function signInWithEmailAndPassword() {
		try {
			const user = await googleSignInWithEmailAndPassword(
				FIREBASE_AUTH,
				email,
				password,
			);

			if (user) {
				goto('/dashboard');
			}
		} catch (err) {
			error = err;
		}
	}

	async function signUpWithEmailAndPassword() {
		try {
			const user = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

			if (user) {
				goto('/dashboard');
			}
		} catch (err) {
			error = err;
		}
	}

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(FIREBASE_AUTH, provider);

		if (user) {
			goto('/dashboard');
		}
	}
</script>

<div class="flex flex-col items-center justify-center w-screen h-full space-y-2">
	<div class="shadow-xl card w-80 md:w-96 bg-base-100">
		<div class="card-body">
			<div class="flex justify-center mb-4">
				<h2 class="card-title">Keep Calm & Budget On</h2>
			</div>

			<div class="form-control">
				<label class="cursor-pointer label">
					<span class="font-semibold label-text">Create a new account?</span>
					<input
						type="checkbox"
						class="toggle toggle-success"
						bind:checked={createAccount}
					/>
				</label>
			</div>

			<label class="w-full max-w-xs form-control">
				<div class="label">
					<span class="label-text">Email</span>
				</div>
				<div class="flex items-center gap-2 input input-bordered">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4 opacity-70"
						><path
							d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
						/><path
							d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
						/></svg
					>
					<input type="text" class="grow" bind:value={email} />
				</div>
			</label>

			<label class="w-full max-w-xs form-control">
				<div class="label">
					<span class="label-text">Password</span>
				</div>
				<div class="flex items-center gap-2 input input-bordered">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4 opacity-70"
						><path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/></svg
					>
					<input type="password" class="grow" bind:value={password} />
				</div>
			</label>

			<div class="form-control">
				<button
					class="text-white uppercase btn btn-primary"
					on:click={createAccount
						? signUpWithEmailAndPassword
						: signInWithEmailAndPassword}
					on:click={signUpWithEmailAndPassword}
				>
					Sign {createAccount ? 'up' : 'in'}
				</button>
			</div>

			{#if error}
				<p class="mt-2 font-semibold text-center text-error">
					Invalid Email or Password
				</p>
			{/if}

			<div class="divider"></div>

			<div class="form-control">
				<button class="uppercase btn btn-outline" on:click={signInWithGoogle}>
					Sign {createAccount ? 'up' : 'in'} with Google
				</button>
			</div>
		</div>
	</div>
</div>
