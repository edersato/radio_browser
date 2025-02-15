import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStop, faPlay, faPencil, faTrashCan, faStar, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

library.add(faStop)
library.add(faPlay)
library.add(faPencil)
library.add(faTrashCan)
library.add(faStar)
library.add(faAnglesLeft)
library.add(faAnglesRight)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
