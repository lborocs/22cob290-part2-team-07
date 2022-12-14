export default defineEventHandler(async event => {
	const clients: Client[] = [
		{
			uid: 1,
			name: "Loughborough University",
			representative: "Firat Batmaz",
			email: "firatbatmaz@lboro.ac.uk",
			phone: "01509 222222",
			website: "https://www.lboro.ac.uk/",
			address:
				"Loughborough University, Loughborough, Leicestershire, LE11 3TU, United Kingdom",
		},
	]
	return clients
})
