<script lang="ts">
	import { goto } from '$app/navigation';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { signOut as firebaseSignout } from 'firebase/auth';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { formatToCurrency } from '$lib/casts';

	let funds: number = 123456;

	async function signOut() {
		await firebaseSignout(FIREBASE_AUTH);

		goto('/');
	}
</script>

<AuthCheck>
	<!-- Authenticated Global Navbar -->
	<div
		class="hidden mx-auto md:container md:my-2 md:border md:shadow-xl md:navbar md:bg-base-100 md:rounded-xl md:border-primary"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</div>
				<ul
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a href="/dashboard" tabindex="0"> Dashboard </a>
					</li>
					<li>
						<a href="/dashboard/budget" tabindex="0"> Budget </a>
					</li>
					<li>
						<a href="/dashboard/transactions" tabindex="0">Transactions</a>
					</li>
				</ul>
			</div>
		</div>
		<div
			class="p-2 space-x-3 text-white border rounded-lg navbar-center {funds > 0
				? 'bg-success border-success'
				: 'bg-error border-error'}"
		>
			<a href="/dashboard/budget" title="budget" class="text-lg font-bold">
				{formatToCurrency(funds)}
				<span class="font-normal text-regular">Needs {funds > 0 ? 'Assigning' : 'Funding'}</span>
			</a>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost btn-circle">
				<div class="indicator">
					<button on:click={signOut}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
							/>
						</svg>
					</button>
				</div>
			</button>
		</div>
	</div>

	<!-- Authenticated Global BottomNav -->

	<!-- Authenticated Content -->
	<slot />
</AuthCheck>
