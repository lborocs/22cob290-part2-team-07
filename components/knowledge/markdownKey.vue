<script setup lang="ts">
let activeIndex = $ref(-1)

function toggleShow(index: number) {
	if (activeIndex == index) activeIndex = -1
	else activeIndex = index
}

function isActive(index: number) {
	return activeIndex == index
}
</script>

<template>
	<ul class="markdown-key">
		<li @click.self="toggleShow(0)" :class="{ show: isActive(0) }">
			Headers
			<ul v-show="isActive(0)" class="headers">
				<li><code># Header 1</code></li>
				<li><code>## Header 2</code></li>
				<li><code>### Header 3</code></li>
				<li><code>#### Header 4</code></li>
				<li><code>##### Header 5</code></li>
				<li><code>###### Header 6</code></li>
			</ul>
		</li>
		<li @click="toggleShow(1)" :class="{ show: isActive(1) }">
			Text Styling
			<ul v-show="isActive(1)">
				<li style="font-style: italic"><code>*Italic*</code></li>
				<li style="font-weight: bold"><code>**Bold**</code></li>
				<li style="font-weight: bold; font-style: italic">
					<code>***Bold Italics***</code>
				</li>
				<li style="text-decoration: line-through">
					<code>~~Strikethrough~~</code>
				</li>
			</ul>
		</li>
		<li @click="toggleShow(2)" :class="{ show: isActive(2) }">
			Lists
			<ul v-show="isActive(2)">
				<li><code>1. Numbered List</code></li>
				<li><code>- Unordered List</code></li>
				<li><code>* Unordered List</code></li>
				<li><code>- [ ] In Progress Task</code></li>
				<li><code>- [x] Completed Task</code></li>
			</ul>
		</li>
		<li @click="toggleShow(3)" :class="{ show: isActive(3) }">
			Links
			<ul v-show="isActive(3)">
				<li><code>[Link Text](link/to/site)</code></li>
				<li><code>[Link Text](link/to/site "Link Title")</code></li>
				<li><code>[Link Text](link/to/site "Link Title")</code></li>
				<li><code>&#60;link/to/site&#62;</code></li>
			</ul>
		</li>
		<li @click="toggleShow(4)" :class="{ show: isActive(4) }">
			Images
			<ul v-show="isActive(4)">
				<li>
					<code>![Alternate Text](link/to/img.png "Image Description")</code>
				</li>
			</ul>
		</li>
		<li @click="toggleShow(5)" :class="{ show: isActive(5) }">
			Table
			<ul v-show="isActive(5)">
				<li>
					<code
						>| Column A | Column B |<br />| -------- | -------- |<br />| Cell
						1,1 | Cell 2,1 |<br />| Cell 1,2 | Cell 2,2 |</code
					>
				</li>
			</ul>
		</li>
		<li @click="toggleShow(6)" :class="{ show: isActive(6) }">
			Code
			<ul v-show="isActive(6)">
				<li>
					<code>Inline `code snippet`</code>
				</li>
				<li>
					<code
						>```python<br />code block <br />
						```</code
					>
				</li>
			</ul>
		</li>
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

	> li {
		&::marker {
			font-size: 1.2em;
			content: "+ ";
		}
		&.show::marker {
			content: "-  ";
		}
	}
}
</style>
