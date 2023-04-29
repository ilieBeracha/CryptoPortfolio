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
import { useEffect } from "react";
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
        
        borderColor: "rgb(98,68,210)",
        backgroundColor: "rgb(98,68,210)",
      },
    ],
  };
  return <Line height={80} width={250} options={options} data={data} />;
}

export default PnlChart;
