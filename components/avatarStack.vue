<template>
	<div class="assignees">
		<UserIcon
			v-for="person in array"
			:key="person.uid"
			v-bind="person"
			:size="42"
		/>
		<div v-if="array.length > 3" class="more-assignees">
			+{{ array.length - 3 }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.assignees {
	display: flex;
	flex-direction: row-reverse;
	a:not(:last-child) {
		margin-left: -1.5rem;
	}
	.more-assignees {
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
import { profilePicture } from "@/types/user"

const props = defineProps<{
	array: User[]
}>()
</script>
