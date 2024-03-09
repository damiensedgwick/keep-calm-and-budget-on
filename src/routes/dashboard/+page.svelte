<script lang="ts">
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { signOut as firebaseSignOut, signOut } from 'firebase/auth';

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);

	async function signOutSSR() {
		await fetch('/api/signin', {
			method: 'DELETE'
		});

		await signOut(FIREBASE_AUTH);
	}
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen">
	<h1>Keep Calm & Budget On: Protected Route?!</h1>
	<button class="w-1/2 btn btn-primary" on:click={signOutSSR}>Sign out</button>
</div>
