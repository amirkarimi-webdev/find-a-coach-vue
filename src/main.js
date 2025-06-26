import { createApp, defineAsyncComponent } from 'vue';

import router from './router.js';
import App from './App.vue';
import store from './store/index.js';

import BaseCard from './components/Ui/BaseCard.vue';
import BaseButton from './components/Ui/BaseButton.vue';
import BaseBadge from './components/Ui/BaseBadge.vue';
import BaseSpinner from './components/Ui/BaseSpinner.vue';
// import BaseDialog from './components/Ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/Ui/BaseDialog.vue')
);

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
