<script setup lang="ts">
import { Bar } from "vue-chartjs"
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
	userHours: {
		[x: string]: number
	}
}>()

/** Variable used for returning current color scheme used by user (light/dark). */
const colorMode = useColorMode()

/** Dynamic variable that creates the data used by the chart based on given prop.  */
const chartData = computed(() => {
	return {
		labels: Object.keys(props.userHours),
		datasets: [
			{
				label: "Worker Hours per Employee",
				data: [...Object.values(props.userHours)] as number[],
				maxBarThickness: 32,
				backgroundColor: "#ffb53c",
			},
		],
	}
})

/** Dynamic variable that creates the options used by the chart (grid, ticks, legend).  */
const chartOptions = computed(() => {
	const color = colorMode.value === "light" ? "#080808" : "#a6acbe"
	const labelsColor = colorMode.value === "light" ? "#000" : "#eee"
	const display = true

	return {
		responsive: true,
		maintainAspectRatio: true,
		scales: {
			x: {
				grid: {
					color,
					display,
				},
				ticks: {
					color: labelsColor,
				},
			},
			y: {
				grid: {
					color,
					display,
				},
				ticks: {
					color: labelsColor,
				},
			},
		},
		plugins: {
			legend: {
				labels: {
					color: labelsColor,
				},
			},
		},
	}
})

/** Variable used to set the style of the chart (width, height). */
const chartStyles = {
	width: "100%",
	height: "20ch",
}
</script>

<template>
	<Bar
		id="workhr-chart"
		:options="chartOptions"
		:data="chartData"
		:style="chartStyles"
	>
	</Bar>
</template>

<style scoped lang="scss">
.test {
}
</style>
