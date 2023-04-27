import { useEffect, useState } from "react";
import "./Dashboard.css";
import { binanceService } from "../../services/BinanceService";
import { TradesModel } from "../../models/TradesModel";
import Trade from "../../Components/Trade/Trade";

function Dashboard(): JSX.Element {
  const [trades, setTrades] = useState<any>([]);
  const [totalPNL, setTotalPNL] = useState<any>(0);

  useEffect(() => {
    binanceService.getFutureTrades().then((res) => {
      setTrades(res.trades)
      setTotalPNL(res.totalPNL)
    }
    );
  }, []);
  return (
    <div className="Dashboard">
      <div className="DashboardRow1">
        <div className="DashboardColRow1">PNL: {totalPNL.toFixed(3) + "$"}</div>
        <div className="DashboardColRow1"></div>
        <div className="DashboardColRow1"></div>
      </div>

      <div className="DashboardRow2">
        <div className="DashboardCol1Row2">
          <table className="DashboardCol1Row2Table">
            <tr id="DashboardCol1Row2TableHeaderRow">
              <th>Symbol</th>
              <th>Side</th>
              <th>Qty</th>
              <th>Price</th>
              <th>PNL</th>
            </tr>
            {trades.map((trade: any) => (
              <Trade trades={trade} />
            ))}
          </table>
        </div>
        <div className="DashboardCol2Row2"></div>
      </div>
      <div className="DashboardRow3">
        <div className="DashboardColRow3"></div>
        <div className="DashboardColRow3"></div>
        <div className="DashboardColRow3"></div>
      </div>
    </div>
  );
}

export default Dashboard;
