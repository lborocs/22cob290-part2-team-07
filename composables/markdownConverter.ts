import { Converter } from "showdown"

export const useMarkdownConverter = (headerLevel: number = 3) => {
	const showdown = new Converter({
		disableForced4SpacesIndentedSublists: true,
		emoji: true,
		noHeaderId: true,
		headerLevelStart: headerLevel,
		simpleLineBreaks: true,
		tables: true,
		tasklists: true,
		strikethrough: true,
		simplifiedAutoLink: true,
		smartIndentationFix: true,
		backslashEscapesHTMLTags: true,
	})
	showdown.setFlavor("github")
	return showdown
}
