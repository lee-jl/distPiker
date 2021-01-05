import Vue from 'vue';
import { Select, Option } from 'element-ui'
import App from './App.vue';
import 'view-design/dist/styles/iview.css';

Vue.use(Select);
Vue.use(Option);
import { Modal, Tabs, TabPane, Tag, FormItem, Input, Message } from 'view-design';
Vue.component('Modal', Modal);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Tag', Tag);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.prototype.$Message = Message
new  Vue({
    el: '#app',
    render: h => {
        return h(App)
    }
})