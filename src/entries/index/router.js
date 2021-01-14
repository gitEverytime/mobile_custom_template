import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex/index.js'
const storage = window.localStorage;
Vue.use(Router);

const vm = new Vue({
	store
});

const router = new Router({
	routes: [
		/**
		 * 选择页面
		 */
		{
			path: '/select/pages',
			component:(resolve) => require(['@/entries/index/views/SelectPages.vue'],resolve),
			meta:{
				title:"选择页面"
			},
		},
		/**
		 * 制作页面
		 */
		{
			path: '/make/page/:type/',
			component:(resolve) => require(['@/entries/index/views/MakePage.vue'],resolve),
			meta:{
				title:"制作页面"
			},
		},
		/**
		 * banner编辑页面
		 */
		{
			path: '/make/banner/:type/',
			component:(resolve) => require(['@/entries/index/views/BannerPage.vue'],resolve),
			meta:{
				title:"制作Banner页面"
			},
		},
		/**
		 * 选择组件
		 */
	]
});
/**
 * 当路由开始跳转时
 *
 */
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});
/**
 * 当路由跳转结束后
 */
router.afterEach(() => {
});
export default router;