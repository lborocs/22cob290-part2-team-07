<template>
	<span class="progress-bar" ref="progressBar"></span>
</template>

<style scoped lang="scss">
.progress-bar {
	position: relative;
	display: inline-block;

	height: 1rem;
	width: 100%;

	background: var(--colour-background-2);
	border-radius: 100vmax;
	overflow: hidden;
}

.progress-bar::before {
	content: "";
	position: absolute;
	inset: 0;
	width: var(--progress, 50%);
	border-radius: 100vmax;
	background: var(--colour-accent);
}
</style>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
	progress: string
}>()

const progressBar = ref<HTMLSpanElement>()

onMounted(() => {
	progressBar!.value!.style.setProperty("--progress", props.progress)
	watchEffect(() => {
		progressBar!.value!.style.setProperty("--progress", props.progress)
	})
})
</script>
