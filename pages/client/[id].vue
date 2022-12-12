<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Clients page",
})
</script>
<template>

	<div>Client: {{ $route.params.id }}</div>

	<client-card>
		<template #client-details>
			<h2 id="title-card">Client details</h2>
		</template>
	</client-card>

</template>


<style scoped lang="scss"></style>
