<template>
	<div class="flex-col users-wrapper">
		<div class="flex-row gap-6" v-for="user in users" :key="user.uid">
			<input
				type="checkbox"
				:name="`select-${user.uid}`"
				:id="`select-${user.uid}`"
				@change="onChange(user.uid, $event)"
			/>
			<label class="flex-row gap-6 user" :for="`select-${user.uid}`">
				<UserIcon
					:email="user.email"
					:name="user.name"
					:is-link="false"
					:size="40"
				/>
				{{ user.name }}
			</label>
		</div>
	</div>
</template>

<style lang="scss">
.users-wrapper {
	gap: 1rem;
	max-height: 20rem;
	padding: 0.5rem;
	background: var(--colour-background-2);
	overflow-y: scroll;
}
input[type="checkbox"] {
	accent-color: var(--colour-accent);
	width: 1.2rem;
	aspect-ratio: 1;
	&:checked + .user {
		background-color: var(--colour-background-3);
	}
}
.user {
	cursor: pointer;
	flex-grow: 1;
	padding: 0.2rem;
}
</style>

<script setup lang="ts">
// import User type
import { defineProps, PropType } from "vue"
import { User } from "@prisma/client"

const props = defineProps({
	users: {
		type: Array as PropType<User[]>,
		required: true,
	},
})

const emit = defineEmits(["change"])

const selectedUsers = ref<number[]>([])

function onChange(uid: number, event: Event) {
	const target = event.target as HTMLInputElement
	if (target.checked) {
		selectedUsers.value.push(uid)
	} else {
		selectedUsers.value = selectedUsers.value.filter(id => id !== uid)
	}
	emit("change", selectedUsers.value)
}
</script>
