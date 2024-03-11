<script lang="ts">
	import { user } from '$lib/firebase';
	import ProgressIndicator from './ProgressIndicator.svelte';
	import SigninForm from './SigninForm.svelte';
</script>

{#if $user === null}
	<SigninForm />
{/if}

{#if $user === undefined}
	<ProgressIndicator />
{/if}

{#if $user}
	<slot />
{/if}
