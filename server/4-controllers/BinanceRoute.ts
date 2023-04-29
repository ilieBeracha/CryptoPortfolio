import express from "express";
import { binanceMyKeys, getBinanceKeys } from "../1-dal/BinanceDal";
import * as dotenv from "dotenv";
import { getIdFromToken } from "../1-dal/jwt";
import { getAllPairsByUserId } from "../3-logic/BinanceLogic";
dotenv.config();

export const BinanceRoute = express.Router();

BinanceRoute.get("/future/pairs", (req, res) => {
  binanceMyKeys.futuresExchangeInfo().then((info) => {
    const symbols = info.symbols.map((symbol) => symbol.symbol);
    console.log(symbols);
    res.status(200).json(symbols);
  });
});

BinanceRoute.get("/future/trades", async (req, res) => {
  const token = req.headers.authorization;
  const userId = await getIdFromToken(token);
  const binance = await getBinanceKeys(Number(userId));
  const pairs: any = await getAllPairsByUserId(Number(userId));
  const symbols: any = [];
  pairs.map((pair: any) => {
    symbols.push(pair.pair);
  });
  const trades: any = [];
  const pnlProgress: any = [];

  const startTimestamp = new Date("2022-05-11T00:00:00Z").getTime();
  const endTimestamp = new Date("2022-05-11T23:59:59Z").getTime();

  let totalPNL = 0; // initialize total PNL to 0
  try {
    for (const symbol of symbols) {
      console.log(`Getting trades for symbol ${symbol}`);

      const tradesForSymbol = await binance.futuresUserTrades({
        symbol: symbol,
        endTime: new Date().getTime()
      });
      
      
      console.log(tradesForSymbol);
      
      console.log(
        `Received ${tradesForSymbol.length} trades for symbol ${symbol}`
      );
      await trades.push(...tradesForSymbol);

      tradesForSymbol.forEach((trade: any) => {
        if (trade.realizedPnl !== "0") {
          if (trade.realizedPnl !== "0") {
            const pnl = Number(trade.realizedPnl);
            pnlProgress.push(pnl);
            totalPNL += pnl;
          }
        }
      });
    }

    console.log(`Total PNL: ${totalPNL}`);
    res.status(200).json({ trades, totalPNL, pnlProgress });
  } catch (e) {
    res.status(400).json(e);
  }
});
