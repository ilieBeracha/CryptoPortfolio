import { TradesModel } from "../../models/TradesModel";
import "./Trade.css";

function Trade({ trades }: { trades: any }): JSX.Element {
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
        <span>{trades.side}</span>
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
        <span>{trades.realizedPnl}</span>
      </td>
    </tr>
  );
}

export default Trade;
