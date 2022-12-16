<script setup lang="ts">
import { Icon } from "@iconify/vue"

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

	const response = await $fetch("/api/asset", {
		method: "POST",
		body: formData,
	})

	uploading = false
}
</script>

<template>
	<label for="file-upload">Choose File(s)</label>
	<input
		@change="selected"
		id="file-upload"
		ref="input-files"
		type="file"
		multiple
		:disabled="uploading"
	/>
	<div>
		<div v-for="file in staged" class="file">
			<span>{{ file.name }}</span>
			<Icon
				icon="material-symbols:delete-forever-outline-rounded"
				@click="remove(file)"
			/>
		</div>
	</div>
	<Button
		icon="material-symbols:upload-rounded"
		@click="upload"
		:disabled="uploading"
		>Upload</Button
	>
</template>

<style scoped lang="scss">
@use "~/assets/button";

label[for="file-upload"] {
	cursor: pointer;
}
input[type="file"] {
	display: none;
}

.file {
	.iconify {
		@extend %button-icon;
		font-size: 1.3em;
	}
}
</style>
