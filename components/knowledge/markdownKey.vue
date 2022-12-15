<script setup lang="ts"></script>

<template>
	<ul class="markdown-key">
		<TreeNode
			><template #title>Text Styling</template>
			<ul>
				<li style="font-style: italic"><code>*Italic*</code></li>
				<li style="font-weight: bold"><code>**Bold**</code></li>
				<li style="font-weight: bold; font-style: italic">
					<code>***Bold Italics***</code>
				</li>
			</ul></TreeNode
		>
		<hr />
	</ul>
</template>

<style scoped lang="scss">
ul {
	padding-left: 1em;
}
hr {
	width: calc(100% + 1em);
	margin: 0.1rem 0 0 -1em;
}
.markdown-key {
	font-size: 1.25em;
}
</style>
