import { defineStore } from 'pinia';
import { auth, db } from '@/includes/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

let usersDocument

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: { }
        }
    },

    actions: {
        init() {
            const router = useRouter()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user
                } else {
                    this.user = { }
                    this.router.replace({ name: 'login' })
                }
            })
        },

        async getUser() {
            const userRef = doc(db, 'users', this.user.uid)
            const userSnapshot = await getDoc(userRef)

            if (userSnapshot.exists()) {
                return {
                    ...userSnapshot.data(),
                    email: this.user.email
                }
            } else {
                return {
                    name: '',
                    age: '',
                    email: this.user.email
                }
            }
        },

        async updateUser(user) {
            usersDocument = doc(db, 'users', this.user.uid)

            delete user.email
            await setDoc(usersDocument, {
                ...user,
                updated: new Date().getTime()
            })
        },

        async register({ email, password, name, age }) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    this.user = response.user
                })

            if (this.user) {
                usersDocument = doc(db, 'users', this.user.uid)

                await setDoc(usersDocument, {
                    name: name,
                    age: age,
                    updated: new Date().getTime()
                })
            }
        },

        async login({ email, password }) {
            return await signInWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    this.user = response.user
                    this.router.push({ path: '/main' })
                })
        },

        logout() {
            signOut(auth)
        }
    }
});