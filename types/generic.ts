export function formData2Object(data: FormData) {
	return [...data.entries()].reduce((obj, pair) => {
		return {
			...obj,
			[pair[0]]: pair[1],
		}
	}, {})
}
