<script lang="ts">
	import { page } from '$app/stores';
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
	<div class="btm-nav md:hidden">
		<a href="/dashboard" class={$page.route.id?.endsWith('dashboard') ? 'active' : ''}>
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
					d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
				/>
			</svg>
			<span class="btm-nav-label"> Dashboard </span>
		</a>
		<a href="/dashboard/budget" class={$page.route.id?.endsWith('budget') ? 'active' : ''}>
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
					d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
				/>
			</svg>

			<span class="btm-nav-label"> Budget </span>
		</a>
		<a
			href="/dashboard/transactions"
			class={$page.route.id?.endsWith('transactions') ? 'active' : ''}
		>
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
					d="M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>

			<span class="btm-nav-label"> Transactions </span>
		</a>
	</div>

	<!-- Authenticated Content -->
	<slot />
</AuthCheck>
