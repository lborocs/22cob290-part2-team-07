export default defineEventHandler(event => {
	return <Topic[]>[
		{
			id: 1,
			name: "Topic A",
		},
		{
			id: 2,
			name: "Topic B",
		},
		{
			id: 3,
			name: "Topic C",
		},
	]
})
