<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { signOut as firebaseSignout } from 'firebase/auth';

	async function signOut() {
		await firebaseSignout(FIREBASE_AUTH);

		goto('/');
	}
</script>

<AuthCheck>
	<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
		<h1>Keep Calm & Budget On: Dashboard</h1>
		<button class="w-1/2 btn btn-primary" on:click={signOut}>Sign out</button>
	</div>
</AuthCheck>
