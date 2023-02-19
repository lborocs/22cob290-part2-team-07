<script setup lang="ts">
import { ModalControl } from "@/composables/modal"
import { User } from ".prisma/client"

defineProps<{
	members: UserRR[]
	control: ModalControl
}>()

defineEmits<{
	(name: "edit", leader: UserRR): void
}>()

const chosenLeader = ref<UserRR[]>()
</script>

<template>
	<Modal :control="control" :title="`Change team leader`">
		<p>Please choose the new project leader.</p>
		<UserSelect
			id="select-leader"
			:users="members"
			v-model:selection="chosenLeader"
			:selectMultiple="false"
		/>
		<ModalFooter>
			<Button
				icon="material-symbols:cancel-outline-rounded"
				@click="control.hide()"
				>Cancel</Button
			>
			<Button
				icon="material-symbols:edit-outline-rounded"
				type="submit"
				@click="control.hide(), $emit('edit', chosenLeader![0])"
				>Confirm</Button
			>
		</ModalFooter>
	</Modal>
</template>

<style scoped lang="scss"></style>
