export interface InitialOfferingBuyOrderData {
  qtyToken: number;
}

export interface AfterMarketBuyOrderData {
  type: "market" | "limit";
  qtyToken: number;
  pricePerToken: number;
  orderExpiration: number;
}

export type BuyOrderData =
  | InitialOfferingBuyOrderData
  | AfterMarketBuyOrderData;
