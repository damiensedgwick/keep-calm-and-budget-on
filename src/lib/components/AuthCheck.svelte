<script lang="ts">
	import { user } from '$lib/firebase';

	if ($user === undefined) {
		console.log('loading...');
	}

	if ($user === null) {
		console.log('no user...');
	}

	if ($user) {
		console.log('there is a user...');
	}
</script>

{#if $user === undefined}
	<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
		<progress class="w-56 progress"></progress>
	</div>
{/if}

{#if $user === null}
	<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
		<p class="text-error">You must be signed in to view this page.</p>
		<a class="btn btn-primary" href="/signin">Sign in</a>
	</div>
{/if}

{#if $user}
	<slot />
{/if}
