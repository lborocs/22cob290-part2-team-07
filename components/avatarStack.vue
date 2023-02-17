<template>
	<div class="assignees">
		<UserIcon
			v-for="person in array.slice(0, 3)"
			:key="person.uid"
			v-bind="person"
			:size="42"
			:is-link="false"
		/>
		<div v-if="array.length > 3" class="more-assignees">
			+{{ array.length - 3 }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.assignees {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	div,
	.more-assignees {
		margin-left: -1.5rem;
		aspect-ratio: 1;

		z-index: 1;
		display: block;
		--image-size: 42px;
		width: var(--image-size);
		height: var(--image-size);
		background-color: var(--colour-accent);
		border-radius: 100vmax;
		display: grid;
		place-items: center;
	}
}
</style>

<script setup lang="ts">
import { User } from ".prisma/client"
import { profilePicture } from "@/types/user"

const props = defineProps<{
	array: User[]
}>()
</script>
