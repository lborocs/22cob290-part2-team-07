<script setup lang="ts">
import { Asset } from ".prisma/client"

const { markdown } = defineProps<{
	markdown: string
}>()

const emit = defineEmits<{
	(e: "update:markdown", value: string): any
}>()

const modalKey = useModal()
const modalAssetPicker = useModal()

function insert(assets: Asset[]) {
	let local = markdown
	for (const asset of assets) {
		local += `[${asset.name}](/cdn/${asset.uid} "${asset.name}")\n`
	}
	emit("update:markdown", local)
}
</script>

<template>
	<Textarea
		name="markdown"
		:model="markdown"
		@update:model="$emit('update:markdown', $event)"
		:attr="{ placeholder: '# Title\n\nBody' }"
	/>
	<div class="controls">
		<Button icon="material-symbols:key-outline-rounded" @click="modalKey.show"
			>Key</Button
		>
		<Button
			icon="material-symbols:upload-file-outline-rounded"
			@click="modalAssetPicker.show"
		>
			Insert
		</Button>
	</div>

	<Modal :control="modalKey" title="Markdown Key">
		<KnowledgeMarkdownKey />
		<ModalFooter>
			<ButtonNuxt
				icon="material-symbols:help-outline-rounded"
				to="https://markdown-guide.readthedocs.io/en/latest/basics.html"
				target="_blank"
				>More Info</ButtonNuxt
			>
		</ModalFooter>
	</Modal>
	<AssetPickerModal
		:control="modalAssetPicker"
		title="Insert Documents"
		@select="insert($event), modalAssetPicker.hide()"
	/>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.textarea {
	min-height: 50vh;
	margin-top: 1rem;
}

.controls {
	@extend %flex-row;
	margin-top: -0.5rem;
	margin-bottom: 1rem;

	button {
		margin-top: 0;
		border-top: {
			left-radius: 0;
			right-radius: 0;
		}
	}
}
</style>
