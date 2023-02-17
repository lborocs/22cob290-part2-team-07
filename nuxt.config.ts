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
	modules: [
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@nuxtjs/color-mode",
	],
	pinia: {
		autoImports: ["defineStore"],
	},
	colorMode: {
		preference: "system", // default value of $colorMode.preference
		fallback: "light", // fallback value if not system preference found
		classPrefix: "theme-",
		classSuffix: "",
		storageKey: "nuxt-color-mode",
	},
})
