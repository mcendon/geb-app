export interface EnergyTrade {
  id: number;
  planetSellerId: number;
  planetSellerName?: string;
  planetBuyerId?: number | null;
  planetBuyerName?: string | null;
  energy: number;
  status: string;
}
