import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics"
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable, type Readable, derived } from 'svelte/store';

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
export const FIREBASE_ANALYTICS = getAnalytics();
export const FIREBASE_AUTH = getAuth();
export const FIREBASE_STORAGE = getStorage();
export const FIREBASE_DB = getFirestore();

function userStore() {
    let unsubscribe: () => void;

    if (!FIREBASE_AUTH || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser');

        const { subscribe } = writable<User | null>(null);

        return {
            subscribe
        };
    }

    const { subscribe } = writable(FIREBASE_AUTH?.currentUser ?? null, (set) => {
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

export function docStore<T>(path: string) {
    let unsubscribe: () => void;

    const docRef = doc(FIREBASE_DB, path);

    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id
    };
}

export const userData = derived(user, ($user, set) => {
    if ($user) {
        return docStore(`users/${$user.uid}`).subscribe(set);
    } else {
        set(null);
    }
});