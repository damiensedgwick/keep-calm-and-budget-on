<script lang="ts">
	import { formatToCurrency } from '$lib/casts';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';

	type Budget = {
		id: string;
		name: string;
		budgetCategories: BudgetCategory[];
	};

	type BudgetCategory = {
		id: string;
		name: string;
		budgetCategoryItems: BudgetCategoryItem[];
	};

	type BudgetCategoryItem = {
		id: string;
		name: string;
		type: BudgetCategoryItemType;
		target: BudgetCategoryItemTarget | undefined;
	};

	type BudgetCategoryItemType = 'bill' | 'debt' | 'saving';

	type BudgetCategoryItemTarget = {
		amount: number;
		date: Date;
	};

	let budget: Budget = {
		id: 'eae02aff-4d96-4086-a07f-8749dbb1fdd9',
		name: 'My First Budget',
		budgetCategories: [
			{
				id: 'ab86dfa9-f8fc-47fe-91ab-aa0f816f3357',
				name: 'Monthly',
				budgetCategoryItems: [
					{
						id: '0893d3f5-083f-45f6-9088-e4a77cef0123',
						name: 'Car Insurance',
						type: 'bill',
						target: {
							amount: 4000,
							date: new Date(2024, 4, 1),
						},
					},
					{
						id: '99e6a815-d47f-4743-b8f5-fe4c8fdff0be',
						name: 'Barclays Credit Card',
						type: 'debt',
						target: {
							amount: 5000,
							date: new Date(2024, 4, 13),
						},
					},
				],
			},
			{
				id: 'f3065239-9d0d-4d43-90e7-f0254be07ef9',
				name: 'Goals',
				budgetCategoryItems: [
					{
						id: 'a4f182f2-c696-46d5-8fbb-cfa5765c0d22',
						name: 'Holiday Fund',
						type: 'saving',
						target: {
							amount: 500000,
							date: new Date(2024, 7, 1),
						},
					},
				],
			},
			{
				id: 'e6059224-d276-42b5-92fa-ec879827f8d3',
				name: 'Yearly',
				budgetCategoryItems: [
					{
						id: '651331d8-5085-4c97-9025-ea39466cef55',
						name: 'Christmas',
						type: 'saving',
						target: {
							amount: 99900,
							date: new Date(2024, 11, 1),
						},
					},
					{
						id: '3c1d1f5e-3f0c-42d4-b25b-dd3e9e84f5a6',
						name: "Jade's Birthday",
						type: 'saving',
						target: {
							amount: 20000,
							date: new Date(2024, 8, 30),
						},
					},
				],
			},
		],
	};

	let detailsElements: HTMLDetailsElement[];
	let areDetailsOpen: boolean = true;

	onMount(() => {
		detailsElements = Array.from(document.querySelectorAll('details'));
	});

	function toggleAllDetails() {
		areDetailsOpen = !areDetailsOpen;

		detailsElements.forEach((detail) => {
			if (areDetailsOpen) {
				detail.open = true;
			} else {
				detail.removeAttribute('open');
			}
		});
	}
</script>

<div class="container px-4 mx-auto mt-5 space-y-4 md:px-0 pb-28">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold">{budget.name}</h1>
		<button class="btn btn-outline btn-sm" on:click={toggleAllDetails}
			>{areDetailsOpen ? 'Close' : 'Open'} All</button
		>
	</div>

	<div class="p-2 bg-white shadow-xl rounded-xl">
		{#each budget.budgetCategories as budgetCategory}
			<details class="divide-y divider-success collapse collapse-arrow" open>
				<summary class="text-xl font-medium collapse-title">
					<div class="flex items-center justify-between">
						<p class="font-semibold">{budgetCategory.name}</p>
						<div class="hidden">
							<p>Total Budgeted: <span>{formatToCurrency(5000)}</span></p>
							<p>Total Spent: <span>{formatToCurrency(7500)}</span></p>
							<p>Total Available: <span>{formatToCurrency(2500)}</span></p>
						</div>
					</div>
				</summary>
				<div class="pt-4 space-y-4 collapse-content">
					{#each budgetCategory.budgetCategoryItems as budgetCategoryItem}
						<div class="flex flex-col py-4 border-b-2 first:pt-0">
							<div class="flex items-center justify-between">
								<p>{budgetCategoryItem.name}</p>

								{#if budgetCategoryItem.target}
									<p class="px-2 py-0.5 rounded-full bg-success text-white">
										{formatToCurrency(budgetCategoryItem.target.amount)}
									</p>
									<p class="hidden">{format(budgetCategoryItem.target.date, 'E io')}</p>
								{/if}
							</div>
							<div class="">
								<progress class="progress progress-success" value="28" max="100"
								></progress>
								<p class="text-xs">
									Funded, Spent {formatToCurrency(5600)} of {formatToCurrency(20000)}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</details>
		{/each}
	</div>
</div>
