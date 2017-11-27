/***方式一****/
/*
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'

Vue.prototype.$http = api;

Vue.config.productionTip = false;

new Vue({
el: '#app',
router,
template: '<App/>',
components: { App }
})
*/


/**方式二**/
import Vue from 'vue'
//引入路由vue-router
import VueRouter from 'vue-router'
import routes from './router'
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
//http请求 axios
import api from './api/index.js'
//接口请求全局化
Vue.prototype.$http = api;

//使用路由
Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'history', //路由模式
	routes,
})

new Vue({
	router,
	el: '#app',
	render: (h) => h(App)
})