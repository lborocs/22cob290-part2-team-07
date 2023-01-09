<script setup lang="ts">
import { Asset } from ".prisma/client"
import { ModalControl } from "@/composables/modal"

const { control: modalControl } = defineProps<{
	control: ModalControl
	title: string
}>()

const emit = defineEmits<{
	(e: "select", assets: Asset[]): void
}>()

const query = ref<string>("")
const modalAssetUpload = useModal()

const { data: assets, refresh } = await useLazyFetch("/api/search/asset", {
	query: {
		q: query,
	},
})

const selected = ref<Asset[]>([])

function equality(a: Asset, b: Asset) {
	return a.uid === b.uid
}

function toggleSelect(asset: Asset) {
	const index = selectedIndex(asset)
	if (index != -1) {
		selected.value.splice(index, 1)
	} else {
		selected.value.push(asset)
	}
}
const selectedIndex = (asset: Asset) =>
	selected.value.findIndex(obj => equality(asset, obj))
const isSelected = (asset: Asset) => selectedIndex(asset) != -1

function clear() {
	selected.value = []
}
</script>

<template>
	<Modal :control="control" :title="title" @close="clear">
		<AssetSearch :query="query" @update:query="query = $event" />
		<div class="asset-container">
			<button
				v-for="asset in assets"
				:key="asset.uid"
				@click="toggleSelect(asset)"
				:class="{ selected: isSelected(asset) }"
			>
				<AssetView
					:asset="asset"
					class="asset"
					:class="{ selected: isSelected(asset) }"
				/>
				<span>{{ asset.name }}</span>
			</button>
		</div>
		<ModalFooter>
			<Button
				@click="modalAssetUpload.show"
				icon="material-symbols:upload-file-outline-rounded"
				>Upload New</Button
			>
			<Button
				@click="$emit('select', selected)"
				icon="material-symbols:done-rounded"
				>Pick {{ selected.length }}</Button
			>
		</ModalFooter>
	</Modal>
	<AssetUploadModal
		:control="modalAssetUpload"
		title="Upload Asset"
		@close="refresh"
	/>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "~/assets/animation";

.asset-container {
	@extend %flex-row;
	justify-content: space-evenly;

	button {
		@extend %flex-col, %flex-centre;
		color: var(--colour-text);
		padding: 0;
		margin: 0;
		border: 0 none;
		background-color: transparent;
		margin: 0.2rem;
		transition: color animation.$transition-short ease-in-out;
		&.selected {
			color: var(--colour-accent);
		}
	}
}

.asset {
	height: 6em;
	width: auto;
	border-radius: 0.5rem;
	border: 2px solid transparent;
	transition: border-color animation.$transition-short ease-in-out;

	&.selected {
		border-color: var(--colour-accent);
	}
	&:hover,
	&:active,
	&:focus {
		border-color: var(--colour-text);
	}
}
</style>
