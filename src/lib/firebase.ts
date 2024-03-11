import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable, type Readable, derived } from 'svelte/store';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA2YzwXUifr5eUD_cRdR7VBJ2pC0UJENr8',
    authDomain: 'linktree-e298a.firebaseapp.com',
    projectId: 'linktree-e298a',
    storageBucket: 'linktree-e298a.appspot.com',
    messagingSenderId: '985288810204',
    appId: '1:985288810204:web:2cde34840335795fa61e19'
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
        const { subscribe } = writable<User | null | undefined>(null);
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