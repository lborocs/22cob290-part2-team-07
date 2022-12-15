<script setup lang="ts">
import { Post } from ".prisma/client"

defineProps<{
	post: Post
}>()

const modalAssetPicker = useModal()
const modalKey = useModal()

function insert() {
	console.log("Inserting asset...")
}
</script>

<template>
	<Textarea
		name="markdown"
		:model="post.markdown"
		@update:model="post.markdown = $event"
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
	<Modal :control="modalAssetPicker" title="Inset Document">
		A Lovely List of Assets + Search Bar
		<ModalFooter>
			<Button
				@click="insert(), modalAssetPicker.hide()"
				icon="material-symbols:done-rounded"
				>Okay</Button
			>
		</ModalFooter>
	</Modal>
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
