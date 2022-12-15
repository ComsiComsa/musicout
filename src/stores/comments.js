import { defineStore } from 'pinia';
import { auth, db } from '@/includes/firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useSongStore } from '@/stores/songs';

let unsubscribe

export const useCommentStore = defineStore('comments', {
    state: () => {
        return {
            comments: []
        }
    },

    getters: {

    },

    actions: {
        async addComment(songId, content) {
            const newComment = {
                content: content,
                created: new Date().getTime(),
                songId: songId,
                author: auth.currentUser.email,
                authorId: auth.currentUser.uid
            }

            const usersDocument = collection(db, 'comments')
            const result = await addDoc(usersDocument, newComment)

            if (result.id) {
                const songStore = useSongStore()
                songStore.changeSongCommentsCount(songId, this.comments.length)

                return Promise.resolve('Added comment')
            } else {
                return Promise.reject('Failed')
            }
        },

        async getComments(songId) {
            const songsCollection =  collection(db, 'comments')
            const q = query(songsCollection, where('songId', '==', songId))

            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tempComments = []

                querySnapshot.forEach((doc) => {
                    const comment = {
                        ...doc.data(),
                        id: doc.id
                    }

                    tempComments.push(comment)
                })

                this.comments = tempComments
            })
        },

        unsubscribeQuery() {
            if (unsubscribe) {
                unsubscribe()
                unsubscribe = null
            }
        }
    }
})