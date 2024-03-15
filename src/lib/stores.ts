import { type User, onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';
import { FIREBASE_AUTH } from './firebase';

function userStore() {
	let unsubscribe: () => void;

	if (!FIREBASE_AUTH || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');

		const { subscribe } = writable<User | null | undefined>(undefined);

		return {
			subscribe,
		};
	}

	const { subscribe } = writable<User | null | undefined>(undefined, (set) => {
		unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
	};
}

export const user = userStore();

export const funds = writable(0);