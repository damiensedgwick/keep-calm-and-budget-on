<script lang="ts">
	import { user } from '$lib/stores';
	import LoadingIndicator from './LoadingIndicator.svelte';
	import SigninForm from './SigninForm.svelte';
</script>

{#if $user === null}
	<SigninForm />
{/if}

{#if $user === undefined}
	<LoadingIndicator />
{/if}

{#if $user}
	<slot />
{/if}
