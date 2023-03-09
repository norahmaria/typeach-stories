import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import Story from './components/public/Story.vue';
import Variant from './components/public/Variant.vue';
import router from './router';

import { $class } from './global';

import './sass/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('Story', Story);
app.component('Variant', Variant);

app.config.globalProperties.$class = $class;

app.mount('#app');
