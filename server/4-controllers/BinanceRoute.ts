import express from "express";
import { binanceMyKeys, getBinanceKeys } from "../1-dal/BinanceDal";
import * as dotenv from "dotenv";
import { getIdFromToken } from "../1-dal/jwt";
import {
  getAllPairsByUserId,
  getAllTradesPnl,
  getBestPerformingTradePair,
  getLastMonthTradesByUserId,
  getSumOfPnl,
  getSumOfPnlByMonth,
  getWinLossStats,
  getWorstPerformingTradePair,
  getfuturesAccountBalance,
  saveUserTrades,
  saveUserTradesFromLastTime,
} from "../3-logic/BinanceLogic";
dotenv.config();

export const BinanceRoute = express.Router();

BinanceRoute.get("/future/pairs", (req, res) => {
  binanceMyKeys.futuresExchangeInfo().then((info) => {
    const symbols = info.symbols.map((symbol) => symbol.symbol);
    console.log(symbols);
    res.status(200).json(symbols);
  });
});

BinanceRoute.get("/future/trades/history", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    await saveUserTrades(Number(userId));
    res.status(200).json("success");
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/newtrades", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await saveUserTradesFromLastTime(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/pnlsum", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getSumOfPnl(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/pnlsumbymonth", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getSumOfPnlByMonth(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/last30", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getLastMonthTradesByUserId(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/pnlbytrade", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getAllTradesPnl(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/bestperforming", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getBestPerformingTradePair(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/worstperforming", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getWorstPerformingTradePair(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get("/future/trades/winloss", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const results = await getWinLossStats(Number(userId));
    res.status(200).json(results);
  } catch (e) {
    res.status(401).json(e);
  }
});

BinanceRoute.get('/future/trades/balances', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await getIdFromToken(token);
    const balances =await getfuturesAccountBalance(Number(userId))
    res.status(200).json(balances);
  } catch (e) {
    res.status(401).json(e);
  }
});
