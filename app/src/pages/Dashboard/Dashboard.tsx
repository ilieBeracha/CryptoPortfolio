import { useEffect, useState } from "react";
import "./Dashboard.css";
import { binanceService } from "../../services/BinanceService";
import { TradesModel } from "../../models/TradesModel";
import Trade from "../../Components/Trade/Trade";
import PnlChart from "../../Components/PnlChart/PnlChart";

function Dashboard(): JSX.Element {
  const [trades, setTrades] = useState<any>([]);
  const [totalPNL, setTotalPNL] = useState<any>(0);
  const[pnlProgress, setPnlProgress] = useState<any>([]);

  useEffect(() => {
    binanceService.getFutureTrades().then((res) => {
      setTrades(res.trades);
      setTotalPNL(res.totalPNL);
      setPnlProgress(res.pnlProgress)   
      console.log(res.pnlProgress);
         
    });
  }, []);
  return (
    <div className="Dashboard">
      <div className="DashboardRow1">
        <div className="DashboardColRow1 DashboardDiv">
          PNL: {totalPNL.toFixed(3) + "$"}
          <PnlChart pnlData={pnlProgress} />
        </div>
        <div className="DashboardColRow1 DashboardDiv"></div>
        <div className="DashboardColRow1 DashboardDiv"></div>
      </div>

      <div className="DashboardRow2">
        <div className="DashboardCol1Row2 DashboardDiv">
          <table className="DashboardCol1Row2Table">
            <tr id="DashboardCol1Row2TableHeaderRow">
              <th>Symbol</th>
              <th>Side</th>
              <th>Time</th>
              <th>Qty</th>
              <th>Price</th>
              <th>PNL</th>
            </tr>
            {trades.map((trade: any) => (
              <Trade key={trade.id} trades={trade} />
            ))}
          </table>
        </div>
        <div className="DashboardCol2Row2 DashboardDiv"></div>
      </div>
      <div className="DashboardRow3">
        <div className="DashboardColRow3 DashboardDiv"></div>
        <div className="DashboardColRow3 DashboardDiv"></div>
        <div className="DashboardColRow3 DashboardDiv"></div>
      </div>
    </div>
  );
}

export default Dashboard;
