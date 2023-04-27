import axios from "axios";
import { BASE_URL } from "./config";

class BinanceService {
  getTokenFromLocalStorage() {
    const token = localStorage.getItem("token");
    return token;
  }
  async getFuturesPairs() {
    const results = (await axios.get(`${BASE_URL}/future/pairs`)).data;
    return results;
  }

  async getFutureTrades() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = (await axios.get(`${BASE_URL}/future/trades`, { headers }))
      .data;
    return results;
  }
}

export const binanceService = new BinanceService();
