import Vue from 'vue';
import { Select, Option } from 'element-ui'
import App from './App.vue';

Vue.use(Select);
Vue.use(Option);

new  Vue({
    el: '#app',
    render: h => {
        return h(App)
    }
})