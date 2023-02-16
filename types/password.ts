import { createHash } from "crypto"

export function hashPassword(email: string, password: string): string {
	const hash = createHash("sha512")
	hash.update(email, "utf8")
	hash.update(password, "utf8")
	return hash.digest("base64")
}
