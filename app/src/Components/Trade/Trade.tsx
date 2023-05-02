import { useEffect } from "react";
import { TradesModel } from "../../models/TradesModel";
import "./Trade.css";

function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function Trade({ trades }: { trades: any }): JSX.Element {

  useEffect(()=>{
    console.log(trades)
  })
  return (
    <tr className="Trade">
      <td className="TradeSymbol TradeTd">
        <span>{trades.symbol}</span>
      </td>

      <td
        className={
          trades.side === "SELL"
            ? "TradesSide TradesSideSell TradeTd"
            : "TradesSide TradesSideBuy TradeTd"
        }
      >
        <button className={trades.side==="BUY"? "TradeSideBtnBuy TradeSideBtn" : "TradeSideBtn TradeSideBtnSell"}>{trades.side}</button>
      </td>

      <td className="TradeTd">
        <span>{formatTime(trades.time)}</span>
      </td>

      <td className="TradesQty TradeTd">
        <span>{trades.qty}</span>
      </td>

      <td className="TradePrice TradeTd">
        <span>{trades.price} $</span>
      </td>

      <td
        className={
          Number(trades.realizedPnl) > 0
            ? "TradePNL TradePnlPositive"
            : Number(trades.realizedPnl) === 0
            ? "TradePNL TradePnlNeutral"
            : "TradePNL TradePnlNegative"
        }
      >
        <span>{Number(trades.realizedPnl).toFixed(5)}</span>
      </td>
    </tr>
  );
}

export default Trade;
