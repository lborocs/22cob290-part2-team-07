export default defineEventHandler(async event => {
	const posts: Post[] = [
		{
			uid: 1,
			topics: [await $fetch("/api/topic/2")],
			owner: await $fetch("/api/user/2"),
			created: new Date("2022-12-01").getTime(),
			title: "Film WatchList",
			markdown:
				"# Movie List\n- Star Wars\n- Shaw Shank Redemption\n- The Bee Movie\n- Shrek\n- E.T\n- Apollo 13\n- Cast Away\n- Forest Gump\n- Toy Story",
		},
		{
			uid: 2,
			topics: [await $fetch("/api/topic/1")],
			owner: await $fetch("/api/user/1"),
			created: new Date("2022-11-15").getTime(),
			title: "The Best Guide to Speaking Latin in the World",
			markdown:
				"# In degravat\n\n## Aquarum murmura nitenti duxisses prosiluit nec laniata\n\nLorem markdownum super paratis dura, pete cedit essent avidaeque giganteis et levis est circumspicit usquam inposita. Et horret positosque terras gurgite iactatis, dis ait dixit. Foret fuit: quid manus, diversaque dolor cuncta, capiebant. Cannis tunc mollire modo, habet luxuriant graves, opus vox spectantem dieque. Modo trahit, deum illic humo ut miseri placuere Charybdis populos pugnam domito gravi matrem ut.\n\n## Nos congestaque pati solo tamen fretum demissus\n\nCum Orchomenosque deos socialia mollia nec inmedicabile cubito, unda nocens auditis ex *medius*; mihi vidistis. Fortissime vobis, vivis exiguam, tibi venatum pubis furor. Ilios tinxit iram verba motis: est ipse frondesque Caesaris ut coniunx signa [videntem](http://stipitetorva.io/urbe-philomela.php): et! Vestibus forma bellator, hinc Dixit faciebant tamen; terra anguigenae serpente, et commenta aurum dedecus, et. Dextera habitata *adfusaque* dominatur barbarus sacra crines nostro murmure hoc, ora orbe montes Hymenaee ceram intendens iacentes Tethys dederis.\n\n1. Faveas peregrinis totus renarro glaebae Caenis\n2. Patrio ducit\n3. Sit et iamque sed Iuppiter satis\n4. Non Iovis deiecto hasta puniceum lac\n5. Auctor magicaeque hoc alii scrutantur tibi sentiat\n6. Saxo deus laniarat et\n\n## Aurora sic tanta\n\nInsistere morisque dapes stridore ictu, resecuta geruntur utque latentia tibi victrix eiusdem. Est missus onerosa. Solo [Me pectus equinis](http://deficit.org/proxima.aspx): temporis et quod cognoscere Astraei hi. Occiduae auxilium trepident quid, fama arbore sine Lichan dubitatis.\n\n## Viri iuvenem Niobe arma Phorcidas ictus ex\n\n*Domusque inmemores* pennis corpore tibi; aera esse, si moneo, et respice adamante. Res sed revincta unde in nostri *quas habet Scyrum* cum urbi et arte; dixit saxo *exstant*. Habet per ad erat tendens lunae, huic Phocus principio; quae adeo. Dei [caeso adventuque](http://www.traxitundis.net/) solvere rubet quis matutinis hoc iuvenem et ab gravis non.\n\n```\ntouchscreenAlertFilename.ocrBurn = maximize_token_click(gibibyte, host, socket);\nfinder = characterIntranetData + cycleUtf;\nccdAnalog.simm += 59;\n```\n\nSine primus est temptat amorem, vox ullis *stridentibus* summa et unguibus ales sit rapiunt, et. Ter summo licet quove. Concordare dixit protinus inplevere sinistro pectore, dignoque signisque posita frustraque Hippocoon victa.\n![Cat!](https://placekitten.com/500/500)",
		},
		{
			uid: 3,
			topics: [await $fetch("/api/topic/3")],
			owner: await $fetch("/api/user/1"),
			created: new Date("2022-12-05").getTime(),
			title: "Monitor Not Working",
			markdown:
				"# What to do if your monitor is not working\n- Begin by checking the power cables and switches.\n- If everything is plugged in, hold down the power button and wait for the screen to flash.\n- If nothing above works plesae bring it down to IT to have it checked out.",
		},
		{
			uid: 4,
			topics: [await $fetch("/api/topic/3")],
			owner: await $fetch("/api/user/2"),
			created: new Date("2022-10-23").getTime(),
			title: "Keyboard Not Working",
			markdown:
				"# What to do if your keyboard is unresponsive\n- Check if your keyboard is plugged in to the computer, if not plug it in and wait a little for it to start up.\n- If it is plugged in an nothing is happening, open the settings and type Keyboard, check to see if it is there\n- If it's not there plesae unplug your keyboard and bring it down to IT to have it checked out.",
		},
		{
			uid: 5,
			topics: [await $fetch("/api/topic/2")],
			owner: await $fetch("/api/user/1"),
			created: new Date("2022-12-07").getTime(),
			title: "Best Movies",
			markdown:
				"# Best Movies\n- The Bee Movie\n- Joker\n- Jaws\n- Misson Impossible\n- Nightmare before Christmas\n- Avatar\n- Monty Python and the holy grail",
		},
	]
	return posts
})
