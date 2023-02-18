<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Clients page",
})
</script>
<template>
	<client-card>
		<template #client-details>
			<h2 id="title-card">Client details</h2>
		</template>
		<template #client-name>
			<h2 id="title-card"></h2>
		</template>
		<template #contact-information>
			<h2 id="title-card"></h2>
		</template>
	</client-card>
</template>

<style scoped lang="scss"></style>
