import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth();
export const FIREBASE_DB = getFirestore();
export const FIREBASE_STORAGE = getStorage();

export const FIREBASE_ANALYTICS = FIREBASE_APP.name && typeof window !== 'undefined' ? getAnalytics(FIREBASE_APP) : null

/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe: () => void;

    if (!FIREBASE_AUTH || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser');

        const { subscribe } = writable<User | null | undefined>(undefined);

        return {
            subscribe
        };
    }

    const { subscribe } = writable<User | null | undefined>(undefined, (set) => {
        unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return {
        subscribe
    };
}

export const user = userStore();