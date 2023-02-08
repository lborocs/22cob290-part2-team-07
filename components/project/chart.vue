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

const chartData = ref({
	labels: Object.keys(props.userHours),
	datasets: [
		{
			label: "Worker Hours per Employee",
			data: [...Object.values(props.userHours)] as number[],
			maxBarThickness: 32,
		},
	],
})

const chartOptions = ref({
	responsive: true,
	maintainAspectRatio: true,
})
</script>

<template>
	<Bar id="workhr-chart" :options="chartOptions" :data="chartData"> </Bar>
</template>

<style scoped lang="scss">
.test {
	// I get an error if I remove this class? weird
}
</style>
