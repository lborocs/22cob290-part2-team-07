import type { RouterConfig } from "@nuxt/schema"
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
	routes: _routes => {
		return [
			{
				path: "/",
				redirect: "/dashboard",
			},
			{
				// Maybe a dedicated page for the error might be a better fit.
				path: "/knowledge/post/",
				redirect: "/knowledge/",
			},
			{
				path: "/knowledge/topic/:uid/",
				redirect: to => {
					return `/knowledge/search?topic=${to.params.uid}`
				},
			},
			..._routes,
		]
	},
}
