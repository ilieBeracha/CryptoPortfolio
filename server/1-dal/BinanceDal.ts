import Binance from 'binance-api-node'
import * as dotenv from 'dotenv';
dotenv.config();

// Authenticated client, can make signed calls
export const binance = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
})





// import Binance from 'node-binance-api';

// export const binance = new Binance().options({
//   APIKEY: process.env.BINANCE_API_KEY,
//   APISECRET: process.env.BINANCE_API_SECRET,
// });
