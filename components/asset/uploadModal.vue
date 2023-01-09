<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ModalControl } from "@/composables/modal"

defineProps<{
	control: ModalControl
	title: string
}>()

const staged = ref<File[]>([])
let uploading = $ref(false)

function equality(a: File, b: File) {
	type property = keyof File
	const properties: property[] = ["lastModified", "name", "size", "type"]
	for (const prop of properties) if (a[prop] !== b[prop]) return false
	return true
}

function selected(event: Event) {
	const input = event.target as HTMLInputElement
	if (!input.files) return

	for (const file of input.files) {
		if (!staged.value.find(f => equality(file, f))) staged.value.push(file)
	}
	input.value = ""
}

function remove(file: File) {
	const index = staged.value.findIndex(f => equality(file, f))
	if (index >= 0) staged.value.splice(index, 1)
}

async function upload() {
	uploading = true
	const formData = new FormData()
	for (let i = 0; i < staged.value.length; i++) {
		const file = staged.value[i]
		formData.append(file.name, file)
	}

	try {
		if (staged.value.length <= 0) return
		const response = await $fetch("/api/asset", {
			method: "POST",
			body: formData,
		})
		clear()
	} finally {
		uploading = false
	}
}

function clear() {
	staged.value = []
}
</script>

<template>
	<Modal :control="control" :title="title">
		<label for="file-upload">Choose File(s)</label>
		<input
			@change="selected"
			id="file-upload"
			ref="input-files"
			type="file"
			multiple
			:disabled="uploading"
		/>
		<div class="files">
			<div v-for="file in staged" class="file">
				<span>{{ file.name }}</span>
				<Icon
					icon="material-symbols:delete-forever-outline-rounded"
					@click="remove(file)"
				/>
			</div>
		</div>
		<ModalFooter>
			<Button
				icon="material-symbols:clear-all-rounded"
				@click="clear"
				:disabled="uploading"
				>Clear All</Button
			>
			<Button
				icon="material-symbols:upload-rounded"
				@click="upload"
				:disabled="uploading"
				>Upload</Button
			>
		</ModalFooter>
	</Modal>
</template>

<style scoped lang="scss">
@use "~/assets/button";
@use "~/assets/core";

label[for="file-upload"] {
	@extend %button-icon, %button-padding;
}
input[type="file"] {
	display: none;
}

.files {
	@extend %flex-col;
}

.file {
	@extend %flex-row;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin-bottom: 1rem;

	.iconify {
		@extend %button-icon;
		font-size: 1.3em;
	}
}
</style>
