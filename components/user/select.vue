<template>
	<div class="flex-col users-wrapper">
		<div class="flex-row gap-6" v-for="user in users" :key="user.uid">
			<input
				:type="selectMultiple ? 'checkbox' : 'radio'"
				:name="`select-${id}`"
				:id="`${id}-select-${user.uid}`"
				:checked="selection.some(u => u.uid === user.uid)"
				@change="onChange(user.uid, $event)"
			/>
			<label class="flex-row gap-6 user" :for="`${id}-select-${user.uid}`">
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

<style scoped lang="scss">
.users-wrapper {
	gap: 1rem;
	max-height: 20rem;
	padding: 0.5rem;
	background: var(--colour-background-2);
	overflow-y: scroll;
}
input[type="checkbox"],
input[type="radio"] {
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
import { defineProps, PropType } from "vue"
import { User } from "@prisma/client"

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	users: {
		type: Array as PropType<User[]>,
		required: true,
	},
	selection: {
		type: Array as PropType<User[]>,
		required: false,
		default: () => [],
	},
	selectMultiple: {
		type: Boolean,
		required: false,
		default: true,
	},
})

const emit = defineEmits(["update:selection"])

function onChange(uid: string, event: Event) {
	const target = event.target as HTMLInputElement
	if (target.checked) {
		if (!props.selectMultiple) {
			props.selection.splice(0, props.selection.length)
		}
		props.selection.push(props.users.find(user => user.uid === uid)!)
	} else {
		props.selection.splice(
			props.selection.findIndex(user => user.uid === uid),
			1,
		)
	}
	emit("update:selection", props.selection)
}
</script>
