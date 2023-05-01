import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      display: false,
    },
    y: {
      ticks: {
        display: false,
        beginAtZero: true,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      display: false,
    },
  },
  elements: {
    line: {
      borderWidth: 1,
    },
  },
};

function PnlChart({ pnlData }: { pnlData: any }) {
  const cumulativePnl = pnlData.reduce((acc: any, val: any) => {
    acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + val);
    return acc;
  }, []);

  const labels = Array.from({ length: pnlData.length }, (_, i) => i + 1);
  const data = {
    labels,
    datasets: [
      {
        label: "PNL Progression",
        data: cumulativePnl,
        pointRadius: 0.1,
        pointHoverRadius: 0.1,
        borderWidth: 1,
        borderColor: "rgb(98,68,210)",
        backgroundColor: "rgb(98,68,210)",
      },
    ],
  };
  return <Line height={80} width={250} options={options} data={data} />
}

export default PnlChart;
