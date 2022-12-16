import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';

import App from './App.vue';
import router from './router';
import vIcon from './directives/vIcon';

import i18n from './includes/i18n.js';
import VeeValidatePlugin from './includes/validation.js';
import { auth } from './includes/firebase.js';

import './assets/base.css';
import './assets/main.css';

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

let app

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
            .use(pinia)
            .use(router)
            .use(VeeValidatePlugin)
            .use(i18n)
            .directive('icon', vIcon)
            .mount('#app');
    }
})


