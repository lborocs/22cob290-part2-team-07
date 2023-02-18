interface PName {
	name: string
	route: string
}

export function usePageName(name?: string) {
	const state = useState<PName>("pageName", () => ({
		name: "",
		route: "",
	}))
	if (name == undefined) return state
	const route = useRoute()
	state.value.route = route.fullPath
	state.value.name = name
	return state
}
