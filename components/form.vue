<script setup lang="ts">
import { RouteLocationRaw } from "vue-router"

const { to, method = "get" } = defineProps<{
	to: RouteLocationRaw
	method?: "get" | "post"
}>()

const form = ref<HTMLFormElement>()

function submit(event: Event) {
	const data = new FormData(form.value)
	const params = new URLSearchParams(data)
	if (method == "get") return navigateTo(`${to}?${params.toString()}`)
	throw new Error("POST method is not supported yet")
}
</script>

<template>
	<form ref="form" :method="method" @submit.prevent="submit"><slot /></form>
</template>

<style scoped lang="scss"></style>
