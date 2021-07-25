import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import store from './services/Store.js';
import Ajax from './services/Ajax.js';

// import SchemaBuilder from './plugins/shemaBuilder';

Vue.config.productionTip = false

Vue.prototype.$ajax = new Ajax();


function start() {
  if(!window.$schemaBuilder) {
    setTimeout(start, 200);
  }
  else {
    Vue.prototype.$schemaBuilder = window.$schemaBuilder;
    Vue.prototype.$wordspace = window.$worspace;
    Vue.prototype.$document = window.document;

    new Vue({
      vuetify,
      store,
      // SchemaBuilder,
      render: h => h(App)
    }).$mount('#app');
  }
}

start();
