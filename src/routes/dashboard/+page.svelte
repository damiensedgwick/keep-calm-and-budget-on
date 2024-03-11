<script lang="ts">
	import { user } from '$lib/firebase';
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen space-y-2">
	<h1>Welcome!</h1>

	{#if $user}
		<p>You are logged in...</p>
	{:else}
		<p>You are not logged in...</p>
	{/if}
</div>
