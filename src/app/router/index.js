import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/components/layout"

Vue.use(VueRouter)

const normalRoutes = [
	{
		path: "/",
		name: "dashboard",
		redirect: "/dashboard",
		component: () => import("@/views/dashboard"),
		meta: {
			icon: "",
			keepAlive: true
		}
	},
	{
		path: "/forbidden",
		name: "403",
		component: () => import("@/views/error/403.vue"),
		meta: {
			hidden: true,
			keepAlive: true
		}
	},
	{
		path: "*",
		name: "404",
		component: () => import("@/views/error/404.vue"),
		meta: {
			hidden: true,
			keepAlive: true
		}
	}
]

const asyncRoutes = [
	{

	}
]

const router = new VueRouter({
	mode: 'history',
})


export default router
