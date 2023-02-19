<script setup lang="ts">
import { Subtask, Task, User } from ".prisma/client"
import { rolesTitle } from "@/types/user"

const props = defineProps<{
	user: UserR
	assigned?: number
	tasks?: (Task & { subtasks: Subtask[] })[]
}>()

const computedHours = $computed(() => {
	if (!props.tasks) return props.assigned ?? 0
	return props.tasks.reduce((acc, val) => {
		if (val.subtasks.length === 0) return acc + val.workerHours
		return acc + val.subtasks.reduce((acc, val) => acc + val.workerHours, 0)
	}, 0)
})
const hoursColour = $computed(() => {
	if (!props.tasks) return "var(--colour-green)"
	const today = new Date()
	const lastDeadline = props.tasks
		.map(task => new Date(task.deadline!))
		.sort((a, b) => b.getTime() - a.getTime())[0]

	// difference in weeks
	const diff = Math.ceil(
		Math.abs(today.getTime() - lastDeadline.getTime()) /
			(1000 * 60 * 60 * 24 * 7),
	)

	const maxHoursPerWeek = 37.5
	console.log({ diff }, { "total:": maxHoursPerWeek * diff })
	if (computedHours > maxHoursPerWeek * diff) return "var(--colour-red)"
	else if (computedHours > maxHoursPerWeek * diff * 0.8)
		return "var(--colour-amber)"
	else return "var(--colour-green)"
})
</script>

<template>
	<ClientOnly>
		<div class="flex-col card-small">
			<UserIcon :email="user.email" :name="user.name" :size="50" />
			<UserName :email="user.email" :name="user.name" class="card-margins" />
			<p class="dimmed card-margins">{{ rolesTitle(user.roles) }}</p>
			<p class="card-margins">
				Assigned hours
				<span
					class="detail-highlight"
					:style="{ color: 'white', '--colour-card-highlight': hoursColour }"
				>
					{{ computedHours }}
				</span>
			</p>
		</div>
	</ClientOnly>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.flex-col {
	@extend %flex-col;
	text-align: center;
}

.card-small {
	@extend %card-small;
	padding: 1.2rem;
	text-align: center;
	width: clamp(10ch, 100%, 30ch);
	min-width: var(--card-width);
}

.card-margins {
	margin: 0 0 0.5rem 0; // top right bottom left
}
</style>
