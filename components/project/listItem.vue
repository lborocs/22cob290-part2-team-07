<script setup lang="ts">
import { Project } from ".prisma/client"

defineProps<{
	project: Project
}>()
</script>

<template>
	<h3>
		<NuxtLink :to="`/project/${project.uid}`" class="project-link">{{
			project.name
		}}</NuxtLink>
	</h3>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.project-link {
	@extend %link;
}
</style>
