<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { signOut as firebaseSignout } from 'firebase/auth';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { formatToCurrency } from '$lib/casts';

	let funds: number = 0;

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
					<li>
						<a href="/dashboard/settings" tabindex="0">Settings</a>
					</li>
				</ul>
			</div>
		</div>
		<div
			class="p-2 space-x-3 text-white border rounded-lg navbar-center {funds >= 0
				? 'bg-success border-success'
				: 'bg-error border-error'}"
		>
			<a href="/dashboard/budget" title="budget" class="text-lg font-bold">
				{formatToCurrency(funds)}
				<span class="font-normal text-regular">Needs {funds >= 0 ? 'Assigning' : 'Funding'}</span>
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

	<!-- Authenticated Mobile Funds Pill -->
	<div
		class="fixed top-4 left-1/2 mx-auto -translate-x-1/2 w-80 md:hidden p-2 text-center text-white border rounded-lg navbar-center {funds >=
		0
			? 'bg-success border-success'
			: 'bg-error border-error'}"
	>
		<a href="/dashboard/budget" title="budget" class="text-lg font-bold">
			{formatToCurrency(funds)}
			<span class="font-normal text-regular">Needs {funds >= 0 ? 'Assigning' : 'Funding'}</span>
		</a>
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
			<small class="btm-nav-label"> Dashboard </small>
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

			<small class="btm-nav-label"> Budget </small>
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

			<small class="btm-nav-label"> Transactions </small>
		</a>
		<a href="/dashboard/settings" class={$page.route.id?.endsWith('settings') ? 'active' : ''}>
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
					d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
				/>
			</svg>
			<small class="btm-nav-label"> Settings </small>
		</a>
	</div>

	<!-- Authenticated Content -->
	<slot />
</AuthCheck>
