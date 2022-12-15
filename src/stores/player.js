import { defineStore } from 'pinia';
import { Howl } from 'howler';
import helper from '@/helpers/formatDate';

export const usePlayerStore = defineStore('player', {
    state: () => {
        return {
            showPlayer: false,
            currentSong: {},
            sound: {},
            seek: '00:00',
            duration: '00:00',
            position: '0%'
        }
    },

    getters: {
        isPlaying: (state) => {
            if (state.sound.playing) {
                return state.sound.playing()
            }

            return false
        }
    },

    actions: {
        addNewSong(song) {
            if (this.sound instanceof Howl) {
                this.showPlayer = false
                this.sound.unload()
            }

            this.currentSong = song

            this.sound = new Howl({
                src: [song.url],
                html5: true
            })

            this.sound.on('load', () => {
                this.showPlayer = true
                this.sound.play()
            })

            this.sound.on('play', () => {
                requestAnimationFrame(this.progress)
            })
        },

        toggleAudio() {
            if (this.sound.playing()) {
                this.sound.pause()
            } else {
                this.sound.play()
            }
        },

        progress() {
            this.seek = helper.formatTime(this.sound.seek())
            this.duration = helper.formatTime(this.sound.duration())
            this.position = `${(this.sound.seek() / this.sound.duration()) * 100}%`

            if (this.sound && this.sound.playing()) {
                requestAnimationFrame(this.progress)
            }
        },

        updateSeek(evt) {
            if (!this.sound.playing) {
                return
            }

            const { x, width } = evt.currentTarget.getBoundingClientRect()
            const clickX = evt.clientX - x
            const percentage = clickX / width
            const seconds = this.sound.duration() * percentage

            this.sound.seek(seconds)
            this.sound.once("seek", this.progress)
        }
    }
})