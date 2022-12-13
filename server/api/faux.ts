import prisma from "@/prisma"
import { TaskStatus } from "@/types"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	if (query.refresh !== undefined)
		await prisma.$transaction([
			prisma.subtask.deleteMany(),
			prisma.task.deleteMany(),
			prisma.project.deleteMany(),
			prisma.post.deleteMany(),
			prisma.asset.deleteMany(),
			prisma.topic.deleteMany(),
			prisma.client.deleteMany(),
			prisma.user.deleteMany(),
		])
	if ((await prisma.user.count()) > 0) return []
	const users = await prisma.$transaction([
		// Users
		prisma.user.create({
			data: { email: "king", name: "Neumann", password: "pking" },
		}),
		prisma.user.create({
			data: { email: "queen", name: "Queen", password: "pqueen" },
		}),
		prisma.user.create({
			data: { email: "dilip", name: "Dilip", password: "pdilip" },
		}),
		prisma.user.create({
			data: { email: "emma", name: "Emma", password: "pemma" },
		}),
		prisma.user.create({
			data: { email: "e", name: "E", password: "pe" },
		}),
	])
	const topics = await prisma.$transaction([
		prisma.topic.create({ data: { name: "Latin" } }),
		prisma.topic.create({ data: { name: "Movies" } }),
		prisma.topic.create({ data: { name: "PC Issues" } }),
	])
	const posts = await prisma.$transaction([
		prisma.post.create({
			data: {
				title: "Film WatchList",
				markdown:
					"# Movie List\n- Star Wars\n- Shaw Shank Redemption\n- The Bee Movie\n- Shrek\n- E.T\n- Apollo 13\n- Cast Away\n- Forest Gump\n- Toy Story",
				owner: { connect: { email: "king" } },
				topic: { connect: { uid: topics[1].uid } },
			},
		}),
		prisma.post.create({
			data: {
				title: "The Best Guide to Speaking Latin in the World",
				markdown:
					"# In degravat\n\n## Aquarum murmura nitenti duxisses prosiluit nec laniata\n\nLorem markdownum super paratis dura, pete cedit essent avidaeque giganteis et levis est circumspicit usquam inposita. Et horret positosque terras gurgite iactatis, dis ait dixit. Foret fuit: quid manus, diversaque dolor cuncta, capiebant. Cannis tunc mollire modo, habet luxuriant graves, opus vox spectantem dieque. Modo trahit, deum illic humo ut miseri placuere Charybdis populos pugnam domito gravi matrem ut.\n\n## Nos congestaque pati solo tamen fretum demissus\n\nCum Orchomenosque deos socialia mollia nec inmedicabile cubito, unda nocens auditis ex *medius*; mihi vidistis. Fortissime vobis, vivis exiguam, tibi venatum pubis furor. Ilios tinxit iram verba motis: est ipse frondesque Caesaris ut coniunx signa [videntem](http://stipitetorva.io/urbe-philomela.php): et! Vestibus forma bellator, hinc Dixit faciebant tamen; terra anguigenae serpente, et commenta aurum dedecus, et. Dextera habitata *adfusaque* dominatur barbarus sacra crines nostro murmure hoc, ora orbe montes Hymenaee ceram intendens iacentes Tethys dederis.\n\n1. Faveas peregrinis totus renarro glaebae Caenis\n2. Patrio ducit\n3. Sit et iamque sed Iuppiter satis\n4. Non Iovis deiecto hasta puniceum lac\n5. Auctor magicaeque hoc alii scrutantur tibi sentiat\n6. Saxo deus laniarat et\n\n## Aurora sic tanta\n\nInsistere morisque dapes stridore ictu, resecuta geruntur utque latentia tibi victrix eiusdem. Est missus onerosa. Solo [Me pectus equinis](http://deficit.org/proxima.aspx): temporis et quod cognoscere Astraei hi. Occiduae auxilium trepident quid, fama arbore sine Lichan dubitatis.\n\n## Viri iuvenem Niobe arma Phorcidas ictus ex\n\n*Domusque inmemores* pennis corpore tibi; aera esse, si moneo, et respice adamante. Res sed revincta unde in nostri *quas habet Scyrum* cum urbi et arte; dixit saxo *exstant*. Habet per ad erat tendens lunae, huic Phocus principio; quae adeo. Dei [caeso adventuque](http://www.traxitundis.net/) solvere rubet quis matutinis hoc iuvenem et ab gravis non.\n\n```\ntouchscreenAlertFilename.ocrBurn = maximize_token_click(gibibyte, host, socket);\nfinder = characterIntranetData + cycleUtf;\nccdAnalog.simm += 59;\n```\n\nSine primus est temptat amorem, vox ullis *stridentibus* summa et unguibus ales sit rapiunt, et. Ter summo licet quove. Concordare dixit protinus inplevere sinistro pectore, dignoque signisque posita frustraque Hippocoon victa.\n![Cat!](https://placekitten.com/500/500)",
				owner: { connect: { email: "queen" } },
				topic: { connect: { uid: topics[0].uid } },
			},
		}),
		prisma.post.create({
			data: {
				title: "Monitor Not Working",
				markdown:
					"# What to do if your monitor is not working\n- Begin by checking the power cables and switches.\n- If everything is plugged in, hold down the power button and wait for the screen to flash.\n- If nothing above works plesae bring it down to IT to have it checked out.",
				owner: { connect: { email: "dilip" } },
				topic: { connect: { uid: topics[2].uid } },
			},
		}),
		prisma.post.create({
			data: {
				title: "Keyboard Not Working",
				markdown:
					"# What to do if your keyboard is unresponsive\n- Check if your keyboard is plugged in to the computer, if not plug it in and wait a little for it to start up.\n- If it is plugged in an nothing is happening, open the settings and type Keyboard, check to see if it is there\n- If it's not there plesae unplug your keyboard and bring it down to IT to have it checked out.",
				owner: { connect: { email: "queen" } },
				topic: { connect: { uid: topics[2].uid } },
			},
		}),
		prisma.post.create({
			data: {
				title: "Best Movies",
				markdown:
					"# Best Movies\n- The Bee Movie\n- Joker\n- Jaws\n- Misson Impossible\n- Nightmare before Christmas\n- Avatar\n- Monty Python and the holy grail",
				owner: { connect: { email: "dilip" } },
				topic: { connect: { uid: topics[1].uid } },
			},
		}),
	])

	const projects = await prisma.$transaction([
		prisma.project.create({
			data: {
				name: "Team Project Part II",
				description: "The team project for module COB290.",
				deadline: new Date("2023-02-20"),
				leader: { connect: { email: "queen" } },
				client: {
					create: {
						name: "Loughborough University",
						representative: "Firat Batmaz",
						email: "f.batmaz@lboro.ac.uk",
					},
				},
				tasks: {
					create: [
						{
							name: "Create Task Viewer",
							description: "Kanban board",
							deadline: new Date("2022-12-15"),
							subtasks: {
								create: [
									{
										name: "Create Kanban",
										workerHours: 2,
									},
									{
										name: "Create List View",
										workerHours: 3,
									},
								],
							},
						},
						{
							name: "Knowledge Management",
							description: "Create the knowledge management system",
							subtasks: {
								create: [
									{
										name: "Create Post Editor",
										workerHours: 4,
									},
									{
										name: "Create Post Viewer",
										workerHours: 5,
									},
								],
							},
						},
					],
				},
			},
			include: {
				tasks: {
					include: {
						subtasks: true,
					},
				},
			},
		}),
	])

	const tasks = await prisma.$transaction([
		prisma.task.create({
			data: {
				name: "Water the Plants",
				description: "Give the tulips 2L of water",
				assignees: { connect: [{ email: "queen" }] },
			},
			include: {
				assignees: true,
				subtasks: true,
			},
		}),
	])

	return {
		users,
		topics,
		posts,
		projects,
		tasks,
	}
})
