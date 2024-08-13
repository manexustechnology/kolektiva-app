export interface InitialOfferingBuyOrderData {
  qtyToken: number;
  pricePerToken: number;
  orderExpiration: number;
  fee: number;
  totalCost: number;
}

export interface AfterMarketBuyOrderData {
  type: "market" | "limit";
  qtyToken: number;
  pricePerToken: number;
  orderExpiration: number;
  fee: number;
  totalCost: number;
}

export type BuyOrderData =
  | InitialOfferingBuyOrderData
  | AfterMarketBuyOrderData;

export type SellOrderData = {
  type: "market" | "limit";
  qtyToken: number;
  pricePerToken: number;
  orderExpiration: number;
  fee: number;
  totalProceeds: number;
};
