import { useEffect, useState } from "react";
import "./Dashboard.css";
import { binanceService } from "../../services/BinanceService";
import Trade from "../../Components/Trade/Trade";
import PnlChart from "../../Components/PnlChart/PnlChart";
import MonthlyPnl from "../../Components/MonthlyPnl/MonthlyPnl";
import { WinLossChart } from "../../Components/WinLossChart/WinLossChart";
import { useSelector } from "react-redux";

function Dashboard(): JSX.Element {
  const [trades, setTrades] = useState<any>([]);
  const [totalPNL, setTotalPNL] = useState<any>(0);
  const [pnlProgress, setPnlProgress] = useState<any>([]);
  const [pnlByMonth, setPnlByMonth] = useState<any>([]);
  const [bestPerformingTradePair, setBestPerformingTradePair] = useState<any>();
  const [winLossStats, setWinLossStats] = useState<any>([]);
  const [futureAccountBalances, setFutureAccountBalances] = useState<any>([]);

  const authSlice = useSelector((state: any) => state.auth);

  useEffect(() => {
    binanceService.getFutureTradesFromLastTime().then(() => {
      binanceService.getSumOfPnl().then((res) => setTotalPNL(res[0].pnl));
      binanceService.getLast30Trades().then((res) => setTrades(res));
      binanceService.getAllTradesPnl().then((res) => setPnlProgress(res));
      binanceService
        .getBestPerformingTradePair()
        .then((res) => setBestPerformingTradePair(res[0]));
      binanceService.getWinLossStats().then((res) => setWinLossStats(res[0]));
      binanceService.getSumOfPnlByMonth().then((res) => {
        setPnlByMonth(res);
      });
      binanceService
        .getFutureAccountBalances()
        .then((res) => setFutureAccountBalances(res));
    });
  }, []);

  return (
    <div className="Dashboard">
      <div className="DashboardMain">
        <div className="DashboardMainPnlRow">
          <h1>Overview</h1>
          <div className="DashboardMainPnl">
            <div className="DashboardMainWinLossChart">
              <span>Win/Loss (%)</span>
              <div className="DashboardMainWinLossChartDiv">
                {winLossStats.length !== 0 ? (
                  <WinLossChart winLossData={winLossStats} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="DashboardMainTotalPnl">
              <span>Total PNL</span>
              <div className="DashboardMainTotalPnlDiv">
                <span>{totalPNL.toFixed(3)}$</span>
                <PnlChart pnlData={pnlProgress} />
              </div>
            </div>
            <div className="DashboardMainBestPerformingTradePair">
              <span>Best performing</span>

              <div className="DashboardMainBestPerformingTradePairDiv">
                {bestPerformingTradePair && (
                  <>
                    <span>
                      {bestPerformingTradePair.symbol} <br />
                    </span>
                    <span
                      className={
                        bestPerformingTradePair.total_pnl > 0
                          ? "bestPerformingTradePairWin"
                          : "bestPerformingTradePairLoss"
                      }
                    >
                      {bestPerformingTradePair.total_pnl.toFixed(2) + "$"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="DashboardMainActivityRow">
          <h1>Activity</h1>
          <div className="DashboardMainActivityTable">
            <table>
              <tr className="DashboardMainActivityTrHeader">
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
        </div>

        {/* <div className="DashboardMainOtherInfo">
          <div className="bestPerformingTradePair">
            <div className="bestPerformingTradePairHeading">
              <span>Best performing trade pair</span>
            </div>

            <div className="bestPerformingTradePairDiv">
              {bestPerformingTradePair && (
                <span>
                  {bestPerformingTradePair.symbol}{" "}
                  {bestPerformingTradePair.total_pnl.toFixed(2) + "$"}
                </span>
              )}
            </div>
          </div>

          <div className="DashboardMainOtherInfo2"></div>
          <div className="DashboardMainOtherInfo2"></div>
        </div> */}
      </div>

      <div className="DashboardUserInfo">
        <div className="DashboardUserInfoTrader">
          <div className="DashboardUserInfoTraderHeader">
            <h3>Trader info</h3>
          </div>

          <div className="DashboardUserInfoTraderTrades">
            <div className="DashboardUserInfoPersonal">
              <span>
                {authSlice.firstName} {authSlice.lastName}
              </span>
            </div>

            <div className="DashboardUserInfoTraderAccountBalances">
              <div className="DashboardUserInfoTraderAccountBalancesHeader">
                <h3>Account Balances</h3>
              </div>
              <div className="DashboardUserInfoTraderAccountBalancesDiv">
                {futureAccountBalances ? (
                  futureAccountBalances.map((balance: any) => (
                    <span>
                      {balance.asset}: {Number(balance.balance).toFixed(2)}
                    </span>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="DashboardUserInfoTradesByMonth">
          <div className="DashboardUserInfoTradesByMonthHeader">
            <span>Monthly</span>
          </div>
          <table>
            <tr className="DashboardUserInfoTradesByMonthTrHeading">
              <th>YEAR</th>
              <th>MONTH</th>
              <th>PNL</th>
            </tr>
            {pnlByMonth.map((pnlData: any) => (
              <MonthlyPnl pnlByMonth={pnlData} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

{
  /* <div className="DashboardRow1">
        <div className="DashboardColRow1 DashboardDiv">
          <PnlChart pnlData={pnlProgress} />
          <div className="pnlUsdDiv">
            <span className="HeadingTitle">רווח/הפסד</span>
            <span style={{ direction: "ltr" }}>{totalPNL.toFixed(3)}</span>
          </div>
        </div>
        <div className="DashboardColRow1 DashboardDiv">
          <div className="bestPerformingTradePairDiv">
            <span className="HeadingTitle">הצמד המצליח ביותר</span>
            {bestPerformingTradePair && (
              <span>
                {bestPerformingTradePair.symbol}{" "}
                {bestPerformingTradePair.total_pnl.toFixed(2) + "$"}
              </span>
            )}
          </div>
        </div>
        <div className="DashboardColRow1 DashboardDiv"></div>
      </div>

      <div className="DashboardRow2">
        <div className="DashboardCol1Row2 DashboardDiv">
          <table className="DashboardCol1Row2Table">
            <tr className="DashboardCol1Row2TableHeaderRow">
              <th>סמל</th>
              <th>צד</th>
              <th>זמן</th>
              <th>כמות</th>
              <th>מחיר</th>
              <th>רווח/הפסד</th>
            </tr>
            {trades.map((trade: any) => (
              <Trade key={trade.id} trades={trade} />
            ))}
          </table>
        </div>
        <div className="DashboardCol2Row2 DashboardDiv">
          <table className="DashboardCol2Row2Table">
            <tr className="DashboardCol1Row2TableHeaderRow">
              <th>שנה</th>
              <th>חודש</th>
              <th>רווח/הפסד</th>
            </tr>
            {pnlByMonth.map((pnlData: any) => (
              <MonthlyPnl pnlByMonth={pnlData} />
            ))}
          </table>
        </div>
      </div>
      <div className="DashboardRow3">
        <div className="DashboardColRow3 DashboardDiv">
          {winLossStats.length!==0?<WinLossChart winLossData={winLossStats}/> : <></>}
        </div>
        <div className="DashboardColRow3 DashboardDiv"></div>
        <div className="DashboardColRow3 DashboardDiv"></div>
      </div> */
}
