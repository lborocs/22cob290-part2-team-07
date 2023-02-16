export function formData2Object(data: FormData): any {
	return [...data.entries()].reduce((obj, pair) => {
		return {
			...obj,
			[pair[0]]: pair[1],
		}
	}, {})
}

export function form2Object(form: HTMLFormElement): any {
	return [...new FormData(form).entries()].reduce((obj, pair) => {
		return {
			...obj,
			[pair[0]]: pair[1],
		}
	}, {})
}
