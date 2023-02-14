<script setup lang="ts">
import { useToggle } from "@vueuse/core"

const colorMode = useColorMode()
const [openState, openToggle] = useToggle(false)

const themes = ["light", "system", "dark"]
</script>

<template>
	<div class="theme-select">
		<ClientOnly>
			<ThemeIcon :theme="colorMode.value" @click="openToggle()" />
			<div v-if="openState">
				<ThemeIcon
					v-for="theme in themes"
					:key="theme"
					:theme="theme"
					@click="colorMode.preference = theme"
				/>
			</div>
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
div.theme-select {
	font-size: 2em;
}
</style>
