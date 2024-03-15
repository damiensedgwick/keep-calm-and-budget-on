<script lang="ts">
	import { formatToCurrency } from '$lib/casts';
	import { funds } from '$lib/stores';

	let amount: number;

	function addFunds() {
		funds.update((currentFunds) => currentFunds + amount * 100);
	}

	function subtractFunds() {
		funds.update((currentFunds) => currentFunds - amount * 100);
	}
</script>

<div class="container px-4 mx-auto mt-5 space-y-4 md:px-0 pb-28">
	<div class="flex items-center justify-between px-1">
		<h1 class="text-xl font-bold">Transactions</h1>
		<button class="btn btn-outline btn-sm">Add Transaction</button>
	</div>

	<div class="p-2 bg-white shadow-xl rounded-xl">
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Payee</th>
						<th>Category</th>
						<th>Note</th>
						<th>In</th>
						<th>Out</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>05/03/2024</th>
						<td>Tescos</td>
						<td>Food shopping</td>
						<td></td>
						<td></td>
						<td>{formatToCurrency(15000)}</td>
					</tr>
					<tr>
						<th>05/03/2024</th>
						<td>BP Garage</td>
						<td>Transport</td>
						<td></td>
						<td></td>
						<td>{formatToCurrency(7000)}</td>
					</tr>
					<tr>
						<th>28/02/2024</th>
						<td>Adapt Digital Ltd</td>
						<td>Tax Accountant</td>
						<td>Salary</td>
						<td>{formatToCurrency(288100)}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
