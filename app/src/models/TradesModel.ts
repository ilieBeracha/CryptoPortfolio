export interface TradesModel {
  trades: [
    {
      buyer: boolean;
      commission: string;
      commissionAsset: string;
      id: number;
      maker: boolean;
      marginAsset: string;
      orderId: number;
      positionSide: string;
      price: string;
      qty: string;
      quoteQty: string;
      realizedPnl: string;
      side: string;
      symbol: string;
      time: number;
    }
  ];
  totalPNL:number
}
