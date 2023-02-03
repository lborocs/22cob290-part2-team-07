<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ModalControl } from "@/composables/modal"

const { control } = defineProps<{
	control: ModalControl
	title: string
}>()

const emit = defineEmits<{
	(e: "open"): void
	(e: "close", ...args: any[]): void
}>()

const dialog = $ref<HTMLDialogElement>()

function close() {
	control.active.value = false
}

function opening() {
	emit("open")
	dialog?.showModal()
}
function closing() {
	dialog?.close()
	emit("close", ...control.exit.value)
}

watch(
	control.active,
	() => {
		if (control.active.value) opening()
		else closing()
	},
	{ immediate: true },
)
</script>

<template>
	<ClientOnly>
		<Teleport to="#dialogues">
			<dialog ref="dialog" @close="close">
				<header>
					<h1>{{ title }}</h1>
					<Icon icon="material-symbols:close-rounded" @click="close" />
				</header>
				<slot />
			</dialog>
		</Teleport>
	</ClientOnly>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "~/assets/button";

dialog {
	@extend %card;
	color: var(--colour-text);
	background-color: var(--colour-highlight);
	border-color: var(--colour-accent);

	width: clamp(35ch, 50%, 80ch);

	&::backdrop {
		background-color: rgba(0, 0, 0, 0.75);
	}

	header {
		@extend %flex-row;
		align-items: center;
		justify-content: space-between;
		.iconify {
			@extend %button-icon;
			font-size: 1.5em;
		}
		h1 {
			margin: 0;
			margin-right: 1rem;
		}
		margin-bottom: 1rem;
	}
}
</style>
