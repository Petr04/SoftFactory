import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/index.vue';
import Privacy from '@/pages/privacy.vue';
import DataProcessingConsent from '@/pages/data-processing-consent.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Index },
      { path: '/order*', component: Index },
      { path: '/privacy', component: Privacy },
      { path: '/data-processing-consent', component: DataProcessingConsent },
    ],
  });
};
