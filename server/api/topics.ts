export default defineCachedEventHandler(
	event => {
		return <Topic[]>[
			{
				uid: 1,
				name: "Topic A",
			},
			{
				uid: 2,
				name: "Topic B",
			},
			{
				uid: 3,
				name: "Topic C",
			},
		]
	},
	{ maxAge: 15 },
)
