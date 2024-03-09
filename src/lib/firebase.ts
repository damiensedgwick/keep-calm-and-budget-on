import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics"
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

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
// export const FIREBASE_ANALYTICS = getAnalytics();
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