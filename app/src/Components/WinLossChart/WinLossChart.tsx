import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import './WinLossChart.css';
ChartJS.register(ArcElement, Tooltip, Legend);

export function WinLossChart({winLossData}:{winLossData:any}) {
     const data = {
        datasets: [
          {
            label: "Win/Loss",
            data: [Number(winLossData.win_percentage).toFixed(0) , Number(winLossData.loss_percentag).toFixed(0)],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      
  return <Pie className="WinLossChart" data={data} />
}
