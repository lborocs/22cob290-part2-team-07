const pub = ["Login", "Registration", "dev"]

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { data: currentUser } = await useCurrentUser()
	const auth = currentUser.value !== null

	const publicRoute = (route: typeof to | typeof from) =>
		pub.includes(route.name?.toString() ?? "")

	if (!publicRoute(to) && !auth)
		return navigateTo("/login", {
			redirectCode: 401, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
		})
})
