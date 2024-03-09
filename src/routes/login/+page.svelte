<script lang="ts">
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(FIREBASE_AUTH, provider);
	}
</script>

<h2>Sign In</h2>
<button class="w-1/2 btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
