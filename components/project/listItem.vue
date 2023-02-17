<script setup lang="ts">
import { Project, Client } from ".prisma/client"

const props = defineProps<{
	project: Project
}>()

const { data: client } = useFetch(`/api/client/${props.project.clientId}`)
</script>

<template>
	<div class="project-details card-small">
		<h3>
			<NuxtLink :to="`/project/${project.uid}`" class="project-link">
				{{ project.name }}
			</NuxtLink>
		</h3>
		<p>{{ project.description }}</p>
		<div class="flex-row gap-6">
			<ClientIcon
				:size="40"
				:uid="project.clientId"
				:name="client?.name ?? 'name'"
			/>
			<p>{{ client?.name }}</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.project-link {
	@extend %link;
}

.card-small {
	width: 100%;
	min-width: var(--card-small-min-width, 25ch);
}
</style>
