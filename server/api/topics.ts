export default defineCachedEventHandler(
	event => {
		return <Topic[]>[
			{
				uid: 1,
				name: "Latin",
			},
			{
				uid: 2,
				name: "Movies",
			},
			{
				uid: 3,
				name: "PC Issues",
			},
		]
	},
	{ maxAge: 15 },
)
