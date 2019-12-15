import Vue from 'vue'
import CreateAPI from 'vue-create-api';
import hello from '../components/hello.vue';

Vue.use(CreateAPI, {
    componentPrefix: 'kpl-',
    apiPrefix: '$kpl-'
  });
  Vue.createAPI(hello, true);
