/***方式一***/
/*
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'

Vue.use(Router)

export default new Router({
mode: 'history',//去掉url中的默认#号
routes: [
    {
      path: '/',
      name:'Index',
      component: Index
    },
    {
      path: '/Content/:id',
      name:'Content',
      component: Content
    }
]
})
*/

/*****方式二*****/
import App from '../App'
const index = r => require.ensure([], () => r(require('../page/index')), 'index');
const content = r => require.ensure([], () => r(require('../page/content')), 'index');

export default [{
	path: '/',
	component: App, //顶层路由，对应index.html
	children: [ //二级路由。对应App.vue
		//地址为空时跳转home页面
		{
			path: '',
			redirect: '/index'
		},
		{
			path: '/index',
			component: index
		},
		{
			path: '/content/:id',
			component: content
		},

	]
}]