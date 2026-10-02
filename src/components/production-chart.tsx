import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface MetalChartProps {
  productData: {
    productName?: string;
    production?: Record<string, number>;
  } | null;
}

function MetalProductionChart({ productData }: MetalChartProps) {
  const statistics = productData?.production || {};
  const years = Object.keys(statistics);
  const values = Object.values(statistics);

  const maxVal = values.length > 0 ? Math.max(...values) : 100;
  const topLimit = Math.ceil(maxVal * 1.15);

  const chartData = {
    labels: years,
    datasets: [
      {
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        max: topLimit,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}

export default MetalProductionChart;
