import { getBinanceKeys } from "../1-dal/BinanceDal";
import { execute } from "../1-dal/dalSql";

export async function getAllPairsByUserId(userId: number) {
  const query = "SELECT * FROM userstradingpairs WHERE userId = ?";
  const [results] = await execute(query, [userId]);
  return results;
}

export async function getLastMonthTradesByUserId(userId: number) {
  const query = `SELECT * FROM trades WHERE userId = ? ORDER BY time DESC LIMIT 30`;
  const [results] = await execute(query, [userId]);
  return results;
}

export async function getSumOfPnl(userId: number) {
  const query = "SELECT SUM(realizedPnl) as pnl FROM trades WHERE userId = ?";
  const [results] = await execute(query, [userId]);
  return results;
}

export async function getAllTradesPnl(userId: number) {
  const query = 'select realizedPnl from trades where userId = ?'
  const [results] = await execute(query, [userId]);
  const pnlValues = results.map((result: any) => parseFloat(result.realizedPnl));
  return pnlValues;
}

export async function saveUserTrades(userId: number) {
  const binance = await getBinanceKeys(Number(userId));
  try {
    const pairs: any = await getAllPairsByUserId(Number(userId));
    const symbols: any = [];
    pairs.map((pair: any) => {
      symbols.push(pair.pair);
    });

    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const endTimestamp = new Date().getTime();

    for (const symbol of symbols) {
      console.log(`Getting trades for symbol ${symbol}`);

      let startTimestamp = new Date("2018-01-01T00:00:00Z").getTime();
      while (startTimestamp < new Date().getTime()) {
        const end = startTimestamp + oneWeek - 1;
        console.log(`Fetching trades for ${symbol} between ${startTimestamp} and ${end}`);
        const tradesForSymbol = await binance.futuresUserTrades({
          symbol: symbol,
          startTime: startTimestamp,
          endTime: end,
        });

        console.log(`Received ${tradesForSymbol.length} trades for symbol ${symbol}`);

        for (const trade of tradesForSymbol) {
          const query = `
            INSERT INTO trades (userId, symbol, orderId, side, price, qty, realizedPnl, commission ,time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const params = [
            userId,
            trade.symbol,
            trade.orderId,
            trade.side,
            trade.price,
            trade.qty,
            trade.realizedPnl,
            trade.commission,
            trade.time,
          ];
          await execute(query, params);
        }
        console.log('saved 1 week of trades');
        
        startTimestamp += oneWeek;
      }
    }

    console.log(`Successfully saved user trades to database.`);
    return true;
  } catch (e) {
    console.error(`Error saving user trades to database: ${e}`);
  }
}
