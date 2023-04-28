import express from "express";
import { binance } from "../1-dal/BinanceDal";
import * as dotenv from "dotenv";
import { getIdFromToken } from "../1-dal/jwt";
import { getAllPairsByUserId } from "../3-logic/BinanceLogic";
dotenv.config();

export const BinanceRoute = express.Router();

BinanceRoute.get("/future/pairs", (req, res) => {
  binance.futuresExchangeInfo().then((info) => {
    const symbols = info.symbols.map((symbol) => symbol.symbol);
    console.log(symbols);
    res.status(200).json(symbols);
  });
});


BinanceRoute.get("/future/trades", async (req, res) => {
  const token = req.headers.authorization;
  const userId = await getIdFromToken(token);
  const pairs: any = await getAllPairsByUserId(Number(userId));
  const symbols: any = [];
  pairs.map((pair: any) => {
    symbols.push(pair.pair);
  });
  const trades: any = [];
  const pnlProgress: any = [];
  let totalPNL = 0; // initialize total PNL to 0
  try {
    for (const symbol of symbols) {
      console.log(`Getting trades for symbol ${symbol}`);
      const tradesForSymbol = await binance.futuresUserTrades({
        symbol: symbol,
        limit: 100,
      });

      console.log(
        `Received ${tradesForSymbol.length} trades for symbol ${symbol}`
      );
      await trades.push(...tradesForSymbol);

      tradesForSymbol.forEach((trade: any) => {
        if (trade.realizedPnl !== '0') {
          if (trade.realizedPnl !== '0') {
            const pnl = Number(trade.realizedPnl);
            pnlProgress.push(pnl);
            totalPNL += pnl;
          }
        }
      });
    }

    console.log(`Total PNL: ${totalPNL}`);
    res.status(200).json({trades,totalPNL,pnlProgress});
  } catch (e) {
    res.status(400).json(e);
  }
});






// BinanceRoute.get("/future/trades", async (req, res) => {
//   const token = req.headers.authorization;
//   const userId = await getIdFromToken(token);
//   const pairs: any = await getAllPairsByUserId(Number(userId));
//   const symbols: any = [];
//   pairs.map((pair: any) => {
//     symbols.push(pair.pair);
//   });
//   const trades: any = [];
//   let totalPNL = 0; // initialize total PNL to 0
//   try {
//     for (const symbol of symbols) {
//       console.log(`Getting trades for symbol ${symbol}`);
//       const tradesForSymbol = await binance.futuresUserTrades({
//         symbol: symbol,
//         limit: 10,
//       });

//       console.log(
//         `Received ${tradesForSymbol.length} trades for symbol ${symbol}`
//       );
//       await trades.push(...tradesForSymbol);

//       // calculate PNL for each trade and add to total PNL
//       tradesForSymbol.forEach((trade: any) => {
//         if (trade.realizedPnl !== '0') {
//           const direction = trade.side === 'BUY' ? 1 : -1;
//           const pnl = Number(trade.realizedPnl) * direction;
//           totalPNL += pnl;
//         }
//       });
//     }

//     console.log(`Total PNL: ${totalPNL}`);
//     res.status(200).json(trades);
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });

// BinanceRoute.get("/future/trades", async (req, res) => {
//   const token = req.headers.authorization;
//   const userId = await getIdFromToken(token);
//   const pairs: any = await getAllPairsByUserId(Number(userId));
//   const symbols: any = [];
//   pairs.map((pair: any) => {
//     symbols.push(pair.pair);
//   });

//   const positions:any = {}; // initialize positions object
//   let totalPNL = 0; // initialize total PNL to 0

//   try {
//     for (const symbol of symbols) {
//       console.log(`Getting trades for symbol ${symbol}`);
//       const tradesForSymbol = await binance.futuresUserTrades({
//         symbol: symbol,
//         limit: 10,
//       });

//       console.log(
//         `Received ${tradesForSymbol.length} trades for symbol ${symbol}`
//       );

//       tradesForSymbol.forEach((trade: any) => {
//         if (trade.realizedPnl !== "0") {
//           const matchingTrades = positions[trade.symbol]
//             ? positions[trade.symbol].filter(
//                 (t: any) => t.price === trade.price && t.side !== trade.side
//               )
//             : [];

//           if (matchingTrades.length > 0) {
//             const direction = trade.side === "BUY" ? 1 : -1;
//             const pnl = Number(trade.realizedPnl) * direction;
//             totalPNL += pnl;
//             const matchingTrade = matchingTrades[0];

//             // add to matching position
//             if (
//               !positions[trade.symbol][matchingTrade.position].trades.includes(
//                 matchingTrade
//               )
//             ) {
//               positions[trade.symbol][matchingTrade.position].trades.push(
//                 matchingTrade
//               );
//             }
//             positions[trade.symbol][matchingTrade.position].trades.push(trade);
//           } else {
//             // create new position
//             const newPosition = {
//               symbol: trade.symbol,
//               price: trade.price,
//               side: trade.side,
//               trades: [trade],
//             };
//             if (!positions[trade.symbol]) {
//               positions[trade.symbol] = [newPosition];
//             } else {
//               positions[trade.symbol].push(newPosition);
//             }
//           }
//         }
//       });
//     }

//     console.log(`Total PNL: ${totalPNL}`);
//     res.status(200).json(positions);
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });
