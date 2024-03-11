<script lang="ts">
	import { goto } from '$app/navigation';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { signOut as firebaseSignout } from 'firebase/auth';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	async function signOut() {
		await firebaseSignout(FIREBASE_AUTH);

		goto('/');
	}
</script>

<AuthCheck>
	<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
		<h1>Welcome!</h1>
		<button class="w-[200px] btn btn-primary text-white" on:click={signOut}>Sign out</button>
	</div>
</AuthCheck>
