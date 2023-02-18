<script setup lang="ts">
import { ModalControl } from "@/composables/modal"

defineProps<{
	name: string
	control: ModalControl
}>()

defineEmits<{
	(e: "delete"): void
}>()
</script>

<template>
	<Modal :control="control" :title="`Delete ${name}`">
		<p>Are you sure you want to delete the {{ name }}.</p>
		<ModalFooter>
			<Button
				icon="material-symbols:cancel-outline-rounded"
				@click="control.hide()"
				>Cancel</Button
			>
			<Button
				icon="material-symbols:delete-outline-rounded"
				@click="control.hide(), $emit('delete')"
				>Confirm</Button
			>
		</ModalFooter>
	</Modal>
</template>

<style scoped lang="scss"></style>
