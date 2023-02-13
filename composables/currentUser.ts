export function useCurrentUser() {
	const uid = useCookie("uid")
	return useFetch(`/api/user/uid/${uid.value}`)
}
