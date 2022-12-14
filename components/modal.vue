<script setup lang="ts">
import { Icon } from "@iconify/vue"

const props = defineProps<{
	show: boolean
	title: string
}>()

const emit = defineEmits<{
	(e: "open"): void
	(e: "close"): void
}>()

const dialog = $ref<HTMLDialogElement>()

function open() {
	emit("open")
	dialog?.showModal()
}

function close() {
	dialog?.close()
	emit("close")
}

watchEffect(() => {
	if (props.show) open()
	else close()
})
</script>

<template>
	<ClientOnly>
		<Teleport to="#dialogues">
			<dialog ref="dialog" @close="close">
				<header>
					<h1>{{ title }}</h1>
					<Icon icon="material-symbols:close-rounded" @click="close" />
				</header>
				<div><slot /></div>
				<footer><slot name="footer" /></footer>
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

	max-width: 80%;
	width: max-content;

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
	footer {
		@extend %flex-row;
		margin-top: 1rem;
	}
}
</style>
