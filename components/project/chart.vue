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

const props = defineProps<{ userHours: {} }>()

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

const chartOptions = ref({
	responsive: true,
	maintainAspectRatio: true,
	scales: {
		x: {
			grid: {
				color: "black",
			},
			ticks: {
				color: "#eee",
			},
		},
		y: {
			grid: {
				color: "black",
			},
			ticks: {
				color: "#eee",
			},
		},
	},
	legend: {
		labels: {
			fontColor: "#eee",
		},
	},
})

const chartStyles = computed(() => {
	return {
		width: "100%",
		height: "20ch",
	}
})
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
