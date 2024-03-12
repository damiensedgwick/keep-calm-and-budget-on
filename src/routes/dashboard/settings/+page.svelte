<script lang="ts">
	import { goto } from '$app/navigation';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { signOut as firebaseSignout } from 'firebase/auth';

	async function signOut() {
		await firebaseSignout(FIREBASE_AUTH);

		goto('/');
	}
</script>

<div class="flex flex-col items-center justify-center h-4/5">
	<button class="text-white btn btn-primary" on:click={signOut}>Sign Out</button>
</div>
