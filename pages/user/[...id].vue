<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Profile-view",
})

</script>

<template>
	<div>{{ $route.params.id[0] }}</div>
</template>

<style scoped lang="scss"></style>
