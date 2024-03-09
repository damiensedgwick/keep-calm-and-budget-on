<script lang="ts">
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(FIREBASE_AUTH, provider);

		const idToken = await credential.user.getIdToken();

		await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
	}
</script>

<div class="flex items-center justify-center w-screen h-screen">
	<button class="w-1/2 btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
</div>
