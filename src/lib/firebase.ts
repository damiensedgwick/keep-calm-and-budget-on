import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { readable, writable } from 'svelte/store';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth();

function userStore() {
    let unsubscribe: () => void;

    if (!FIREBASE_AUTH || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser');
        return readable<User | null | undefined>(undefined);
    }

    return writable<User | null | undefined>(undefined, (set) => {
        unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });
}

export const user = userStore();