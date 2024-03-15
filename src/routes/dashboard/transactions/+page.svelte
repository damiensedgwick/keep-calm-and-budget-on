<script lang="ts">
	import { funds } from '$lib/stores';

	let amount: number;

	function addFunds() {
		funds.update((currentFunds) => currentFunds + amount * 100);
	}

	function subtractFunds() {
		funds.update((currentFunds) => currentFunds - amount * 100);
	}
</script>

<div class="flex items-center justify-center h-4/5">
	<div class="flex flex-col space-y-6">
		<input
			type="text"
			placeholder="Type here"
			class="w-full max-w-xs input input-bordered input-primary"
			bind:value={amount}
		/>
		<button class="btn btn-neutral" on:click={addFunds}>Add funds</button>
		<button class="btn btn-neutral" on:click={subtractFunds}>
			Subtract funds funds
		</button>
	</div>
</div>
