import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';

import App from './App.vue';
import router from './router';

import VeeValidatePlugin from './includes/validation.js';
import './includes/firebase.js';

import './assets/base.css';
import './assets/main.css';

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

createApp(App)
    .use(pinia)
    .use(router)
    .use(VeeValidatePlugin)
    .mount('#app');
