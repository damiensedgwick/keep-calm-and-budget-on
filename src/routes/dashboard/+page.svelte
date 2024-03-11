<script lang="ts">
	import { user } from '$lib/firebase';
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
	<h1>Welcome!</h1>

	{#if $user === undefined}
		<p>Loading...</p>
	{:else if $user === null}
		<p>You are not logged in...</p>
	{:else}
		<p>You are logged in, yay!</p>
	{/if}
</div>
