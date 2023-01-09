<script setup lang="ts">
import { Asset } from ".prisma/client"

const props = defineProps<{
	asset: Asset
}>()

const CDN = "/cdn/"

let errorCount = $ref(0)
watch(props, () => {
	errorCount = 0
})

const link = $computed(() => `${CDN}${props.asset.uid}?r=${errorCount}`)
const isImage = $computed(() => props.asset.mimeType.startsWith("image"))
const isAudio = $computed(() => props.asset.mimeType.startsWith("audio"))
const isVideo = $computed(() => props.asset.mimeType.startsWith("video"))
const isPdf = $computed(() =>
	props.asset.mimeType.startsWith("application/pdf"),
)

function loadError() {
	errorCount++
}
</script>

<template>
	<img
		v-if="isImage"
		:src="link"
		:alt="asset.name"
		:title="asset.name"
		@error="loadError"
	/>
	<audio controls v-else-if="isAudio">
		<source :src="link" :type="asset.mimeType" />
	</audio>
	<video controls v-else-if="isVideo">
		<source :src="link" :type="asset.mimeType" />
	</video>
	<embed v-else :src="link" :type="asset.mimeType" />
</template>

<style scoped lang="scss"></style>
