import Binance from "binance-api-node";
// import * as dotenv from 'dotenv';
// dotenv.config();

import { execute } from "./dalSql";

export const binanceMyKeys = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

export async function getBinanceKeys(userId: number) {
  const query = `SELECT apiKey, secretKey FROM users WHERE id = ?`;
  const [results] = await execute(query, [userId]);
  const { apiKey, secretKey } = results[0];
  const binance = Binance({
    apiKey: apiKey,
    apiSecret: secretKey,
    
  });
  return binance;
}
