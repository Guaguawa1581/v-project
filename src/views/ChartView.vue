<template>
  <div style="max-width: 800px; margin: auto">
    <h2>Vue Chart.js Demo</h2>

    <div
      v-for="(chart, i) in charts"
      :key="i"
      style="height: 300px; margin-bottom: 40px"
    >
      <h3>{{ chart.title }}</h3>
      <component :is="chart.component" :data="chart.data" :options="options" />
    </div>
  </div>
</template>
  
  <script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  CategoryScale,
  LinearScale,
  BubbleController,
  ScatterController,
} from "chart.js";

import {
  Bar,
  Line,
  Pie,
  Radar,
  Doughnut,
  PolarArea,
  Scatter,
  Bubble,
} from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  CategoryScale,
  LinearScale,
  ScatterController,
  BubbleController
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  //   indexAxis: "y", // ⭐ 水平 bar chart 關鍵
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     y: {
  //       ticks: {
  //         autoSkip: false,
  //       },
  //     },
  //   },
};

const chartData = {
  labels: ["January", "February", "March", "April", "May"],
  indexAxis: "y",
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "#42A5F5",
      borderColor: "#1E88E5",
      data: [40, 20, 12, 70, -36],
    },
    {
      label: "Dataset 2",
      backgroundColor: "#FF6384",
      borderColor: "#C2185B",
      data: [10, 30, 50, 20, 60],
    },
  ],
};

const pieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      data: [300, 50, 100],
    },
  ],
};

const radarData = {
  labels: ["Running", "Swimming", "Eating", "Cycling"],
  datasets: [
    {
      label: "Activity",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      data: [20, 10, 4, 2],
    },
  ],
};

const polarData = {
  labels: ["A", "B", "C", "D"],
  datasets: [
    {
      label: "Polar Data",
      data: [11, 16, 7, 3],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED"],
    },
  ],
};

const scatterData = {
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
      ],
      backgroundColor: "#36A2EB",
    },
  ],
};

const bubbleData = {
  datasets: [
    {
      label: "Bubble Dataset",
      data: [
        { x: 20, y: 30, r: 10 },
        { x: 40, y: 10, r: 20 },
        { x: 25, y: 50, r: 15 },
      ],
      backgroundColor: "#FF6384",
    },
  ],
};

const charts = [
  { title: "Bar Chart", component: Bar, data: chartData },
  { title: "Line Chart", component: Line, data: chartData },
  { title: "Pie Chart", component: Pie, data: pieData },
  { title: "Radar Chart", component: Radar, data: radarData },
  { title: "Doughnut Chart", component: Doughnut, data: pieData },
  { title: "Polar Area Chart", component: PolarArea, data: polarData },
  { title: "Scatter Chart", component: Scatter, data: scatterData },
  { title: "Bubble Chart", component: Bubble, data: bubbleData },
];
</script>
  
  <style scoped>
h2,
h3 {
  text-align: center;
}
</style>
  