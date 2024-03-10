<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
		<p class="text-error">You must be signed in to view this page.</p>
		<a class="btn btn-primary" href="/signin">Sign in</a>
	</div>
{/if}
