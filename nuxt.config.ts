// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["~/assets/global.scss"],
	experimental: {
		reactivityTransform: true,
	},
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			meta: [{ name: "description", content: "Make-It-All Management System" }],
		},
	},
})
