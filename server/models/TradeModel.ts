export interface TradeHistory {
    id: number;
    userId: number;
    symbol: string;
    orderId: string;
    side: string;
    price: string;
    qty: string;
    realizedPnl: string;
    marginAsset: string;
    commission: string;
    time: number;
    binanceId: number;
  }
  