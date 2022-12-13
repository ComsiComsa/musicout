import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, auth, db } from '@/includes/firebase.js';
import { collection, query, onSnapshot, addDoc, where, setDoc, doc, deleteDoc } from 'firebase/firestore';

let getSongsSnapshot = null

export const useSongStore = defineStore('songs', {
    state: () => {
        return {
            songs: [],
            uploads: []
        }
    },

    actions: {
        init() {
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    this.songs = []
                } else {
                    this.getSongs()
                }
            })
        },

        async getSongs() {
            const songsCollection =  collection(db, 'songs')
            const q = query(songsCollection, where('author', '==', auth.currentUser.uid))

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tempSongs = []

                querySnapshot.forEach((doc) => {
                    const song = {
                        ...doc.data(),
                        editable: false,
                        id: doc.id
                    }

                    tempSongs.push(song)
                })

                this.songs = tempSongs
            })
        },

        upload(file) {
            const songRef = ref(storage, `songs/${file.name}`);
            const task = uploadBytesResumable(songRef, file)

            const uploadIndex = this.uploads.push({
                currentProgress: 0,
                name: file.name,
                bgClass: 'bg-blue-400',
                textClass: '',
                icon: 'fas fa-spinner fa-spin',
                task: task
            }) - 1

            task.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    this.uploads[uploadIndex].currentProgress = progress
                },
                (error) => {
                    this.uploads[uploadIndex].bgClass = 'bg-red-400'
                    this.uploads[uploadIndex].icon = 'fas fa-times'
                    this.uploads[uploadIndex].textClass = 'text-red-400'
                },
                async () => {
                    const song = {
                        author: auth.currentUser.uid,
                        originalName: task.snapshot.ref.name,
                        modifiedName: task.snapshot.ref.name,
                        genre: '',
                        commentsCount: 0
                    }

                    await getDownloadURL(task.snapshot.ref)
                        .then((downloadURL) => {
                            song.url = downloadURL
                        })
                        .catch((error) => {
                            console.log('Error by loading => ', error)
                            console.log(task.snapshot.ref)
                        })

                    const songDocument = collection(db, 'songs')
                    await addDoc(songDocument, {
                        ...song,
                        updated: new Date().getTime()
                    })


                    this.uploads[uploadIndex].bgClass = 'bg-green-400'
                    this.uploads[uploadIndex].icon = 'fas fa-check'
                    this.uploads[uploadIndex].textClass = 'text-green-400'

                    setTimeout(() => {
                        this.uploads.splice(uploadIndex, 1)
                    })
                }
            )
        },

        cancelAllUploads() {
            this.uploads.forEach(upload => {
                upload.task.cancel()
            })

            this.uploads = []
        },

        openEditPopup(song) {
            song.editable = !song.editable
        },

        async editSong({ editable, id, ...newSong }) {
            const songDocument = doc(db, 'songs', id)

            await setDoc(songDocument, {
                ...newSong,
                updated: new Date().getTime()
            })
        },

        async deleteSong({ id, originalName }) {
            const songDocument = doc(db, 'songs', id)
            await deleteDoc(songDocument)

            const songRef = ref(storage, `songs/${originalName}`)
            await deleteObject(songRef)
        }
    }
});