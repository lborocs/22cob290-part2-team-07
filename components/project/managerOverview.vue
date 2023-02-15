<template>
	<article class="card-small rag-band">
		<h3 class="project-title">
			<NuxtLink :to="`/project/${project.uid}`">{{ project.name }}</NuxtLink>
		</h3>
	</article>
</template>

<style scoped lang="scss">
.project-title a {
	color: var(--colour-text);
	text-decoration: underline var(--colour-accent);
}
</style>

<script setup lang="ts">
import { Project } from "@prisma/client"
const props = defineProps<{
	project: Project
}>()
</script>
