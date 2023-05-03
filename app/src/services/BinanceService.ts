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

  async getFutureTradesFromLastTime() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = (
      await axios.get(`${BASE_URL}/future/trades/newtrades`, { headers })
    ).data;
    return results;
  }

  async getFutureTradesHistory() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = (
      await axios.get(`${BASE_URL}/future/trades/history`, { headers })
    ).data;
    return results;
  }

  async getSumOfPnl() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = (
      await axios.get(`${BASE_URL}/future/trades/pnlsum`, { headers })
    ).data;
    return results;
  }

  async getSumOfPnlByMonth() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = (
      await axios.get(`${BASE_URL}/future/trades/pnlsumbymonth`, {
        headers,
      })
    ).data;
    return results;
  }

  async getAllTradesPnl() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await axios.get(`${BASE_URL}/future/trades/pnlbytrade`, {
      headers,
    });
    return results.data;
  }

  async getLast30Trades() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await axios.get(`${BASE_URL}/future/trades/last30`, {
      headers,
    });
    return results.data;
  }

  async getBestPerformingTradePair() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await axios.get(
      `${BASE_URL}/future/trades/bestperforming`,
      {
        headers,
      }
    );
    return results.data;
  }

  async getWorstPerformingTradePair() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await axios.get(
      `${BASE_URL}/future/trades/worstperforming`,
      {
        headers,
      }
    );
    return results.data;
  }

  async getWinLossStats() {
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await axios.get(`${BASE_URL}/future/trades/winloss`, {
      headers,
    });
    return results.data;
  }

  async getFutureAccountBalances(){
    const token = this.getTokenFromLocalStorage();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await axios.get(`${BASE_URL}/future/trades/balances`, {
      headers,
    });
    return results.data;
  }
}

export const binanceService = new BinanceService();
