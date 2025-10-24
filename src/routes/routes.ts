import LandingPage from '../pages/Landing/landing-page.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { handleRouteMeta } from './route-utils'
import {
	get404PageMeta,
	getCheckoutPageMeta,
	getLandingPageMeta,
} from '../data/meta-utils'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: LandingPage,
		beforeEnter: () => handleRouteMeta(getLandingPageMeta),
	},
	{
		path: '/products',
		name: 'Products',
		component: () => import('../pages/Category/category-page.vue'),
		props: (route: any) => ({ category: route.query.category }),
	},
	{
		path: '/product/:sku',
		name: 'Product',
		component: () => import('../pages/Product/productinfo-page.vue'),
		props: (route: any) => ({ sku: route.params.sku }),
	},

	// {
	// 	path: '/product',
	// 	name: 'Product',
	// 	component: () => import('../pages/Product/productinfo-page.vue'),
	// 	props: route => ({ sku: route.query.sku }),
	// },
	{
		path: '/all',
		name: 'All',
		component: () => import('../pages/Category/products-page.vue'),
	},
	{
		path: '/checkout',
		component: () => import('../pages/Checkout/checkout-page.vue'),
		beforeEnter: () => handleRouteMeta(getCheckoutPageMeta),
	},
	{
		path: '/404',
		component: () => import('../pages/404/404-page.vue'),
		beforeEnter: () => handleRouteMeta(get404PageMeta),
	},
	{
		path: '/:pathMatch(.*)',
		component: () => import('../pages/404/404-page.vue'),
		beforeEnter: () => handleRouteMeta(get404PageMeta),
	},
	// categoryRoute('keyboards'),
	// categoryRoute('keycaps'),
	// categoryRoute('deskmats'),
	// productRoute('keyboards'),
	// productRoute('keycaps'),
	// productRoute('deskmats'),
]

const Router = createRouter({
	history: createWebHistory(),
	routes,

	scrollBehavior(_1, _2, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
})

export default Router
