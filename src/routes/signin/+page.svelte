<script lang="ts">
	import { goto } from '$app/navigation';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(FIREBASE_AUTH, provider);

		if (user) {
			goto('/dashboard');
		}
	}
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
	<div class="shadow-xl card w-96 bg-base-100">
		<div class="card-body">
			<h2 class="card-title">Card title!</h2>
			<p>If a dog chews shoes whose shoes does he choose?</p>
			<div class="justify-end card-actions">
				<button class="w-1/2 btn btn-primary" on:click={signInWithGoogle}>
					Sign in with Google
				</button>
			</div>
		</div>
	</div>
</div>
