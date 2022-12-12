import { defineStore } from 'pinia';
import { auth } from '@/includes/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: { }
        }
    },

    actions: {
        init() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user
                    this.router.push({ name: 'main' })
                } else {
                    this.user = { }
                    this.router.replace({ name: 'login' })
                }
            })
        },

        async register({ email, password }) {
            return await createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    this.user = response.user
                })
        },

        login({ email, password }) {
            signInWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    this.user = response.user
                })
        },

        logout() {
            signOut(auth)
        }
    }
});