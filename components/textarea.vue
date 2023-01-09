<script setup lang="ts">
import { Ref } from "vue"
import { TextareaHTMLAttributes } from "vue"

const props = withDefaults(
	defineProps<{
		model: string
		name?: string
		attr?: TextareaHTMLAttributes
	}>(),
	{
		attr: {},
	},
)

const emit = defineEmits<{
	(e: "update:model", value: typeof props.model): void
}>()

let height = $ref(0)
const shadow = $ref<HTMLTextAreaElement>()
function calcHeight() {
	height = shadow?.scrollHeight ?? 0
}

function update(event: Event) {
	emit("update:model", (event.target as HTMLTextAreaElement).value)
	calcHeight()
}

onMounted(calcHeight)
watch(() => props.model, calcHeight, {
	flush: "post",
})
</script>

<template>
	<div class="textarea">
		<textarea
			:value="model"
			:id="name"
			:name="name"
			:style="`--height: ${height}px`"
			@input="update"
			class="blaze"
			v-bind="attr"
		/>
		<textarea disabled id="shadow" ref="shadow">{{ model }}</textarea>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
.textarea {
	position: relative;
}

textarea {
	font: inherit;
	// font-family: monospace;
	width: 100%;
}

.blaze {
	@extend %input;
	height: calc(var(--height, 0px) + 3em);
	padding: 1em;
	min-height: inherit;
	overflow-y: hidden;
	resize: vertical;
}
#shadow {
	position: absolute;
	top: 0em;
	left: 0em;
	z-index: -10;
	resize: none;
	color: transparent;
	background-color: transparent;
	border-color: transparent;
}
</style>
