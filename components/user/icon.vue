<script setup lang="ts">
const src = "https://placekitten.com/50/50";
</script>

<template>
	<img :src="src" />
</template>

<style scoped lang="scss">
img {
	border-radius: 50%;
}
</style>
