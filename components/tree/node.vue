<script setup lang="ts">
const show = $ref(false)
</script>

<template>
	<li @click.self="show = !show" :class="{ show: show }">
		<slot name="title" />
		<slot v-if="show" />
	</li>
</template>

<style scoped lang="scss">
li::marker {
	font-size: 1.2em;
	content: "+ ";
}
li.show::marker {
	content: "-  ";
}
</style>
