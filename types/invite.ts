export function encodeEmail(email: string, date?: DateString): string {
	const dt = date === undefined ? new Date(Date.now()) : new Date(date)

	return Buffer.from(
		JSON.stringify({
			email,
			datetime: dt,
		}),
	).toString("base64")
}

export function decodeEmail(cipher: string): string {
	return JSON.parse(Buffer.from(cipher, "base64").toString()).email
}
