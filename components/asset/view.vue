<script setup lang="ts">
import { Asset } from ".prisma/client"

const { asset } = defineProps<{
	asset: Asset
}>()

const link = $computed(() => `/cdn/${asset.uid}`)
const isImage = $computed(() => asset.mimeType.startsWith("image"))
const isAudio = $computed(() => asset.mimeType.startsWith("audio"))
const isVideo = $computed(() => asset.mimeType.startsWith("video"))
const isPdf = $computed(() => asset.mimeType.startsWith("application/pdf"))
</script>

<template>
	<img v-if="isImage" :src="link" :alt="asset.name" />
	<audio controls v-else-if="isAudio">
		<source :src="link" :type="asset.mimeType" />
	</audio>
	<video controls v-else-if="isVideo">
		<source :src="link" :type="asset.mimeType" />
	</video>
	<embed v-else :src="link" :type="asset.mimeType" />
</template>

<style scoped lang="scss"></style>
